import pickle
import numpy as np
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer

# Load trained ML model
model_path = "model.pkl"  # Ensure this is in the project root folder
try:
    model = pickle.load(open(model_path, "rb"))
except Exception as e:
    model = None
    print(f"Error loading model: {str(e)}")


def predict_popularity(event):
    """Predict event popularity using the ML model"""
    try:
        if model is None:
            return "Error: ML model not loaded."

        input_data = np.array([[event.get('attendees', 0), event.get('ticket_price', 0), event.get('past_attendance', 0)]])
        prediction = model.predict(input_data)[0]
        return ['Low', 'Medium', 'High'][prediction]
    
    except Exception as e:
        return f"Error in prediction: {str(e)}"


class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event_data = serializer.validated_data
            event_data['popularity'] = predict_popularity(event_data)  # Predict before saving
            event = Event.objects.create(**event_data)
            return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            updated_data = serializer.validated_data
            
            # Recalculate popularity only if relevant fields change
            if any(field in updated_data for field in ['attendees', 'ticket_price', 'past_attendance']):
                updated_data['popularity'] = predict_popularity(updated_data)
                
            serializer.save(**updated_data)
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
