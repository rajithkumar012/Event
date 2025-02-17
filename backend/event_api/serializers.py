from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

    def validate_attendees(self, value):
        if value < 0:
            raise serializers.ValidationError("Attendees must be non-negative.")
        return value

    def validate_ticket_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Ticket price must be non-negative.")
        return value
