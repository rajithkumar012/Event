from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from .ml_model import predict_popularity

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        data['popularity'] = predict_popularity(data)
        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Deserialize data
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            updated_data = serializer.validated_data
            
            # Predict updated popularity based on new data
            predicted_popularity = predict_popularity(updated_data)
            
            # Save instance with updated popularity
            serializer.save(popularity=predicted_popularity)
            
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

