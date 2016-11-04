from django.shortcuts import render
from booklist.models import Book, Author, Category

# Create your views here.
def menu(request):
    data = {};
    books = Book.objects.order_by('title').all();
    data['books'] = books;
    return render(request, "booklist/menu.html", data)
