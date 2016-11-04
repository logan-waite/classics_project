from django.db import models

# Table for the authors
class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return self.first_name + " " + self.last_name

# Book categories
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

# Table for the books
class Book(models.Model):
    title = models.CharField(max_length=50)
    author = models.ForeignKey(Author)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.title
