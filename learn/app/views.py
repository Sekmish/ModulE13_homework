from django.shortcuts import render
from .models import Message

def intex_test(request):
    messages = Message.objects.all()
    return render(request, 'index.html', {'text':messages})