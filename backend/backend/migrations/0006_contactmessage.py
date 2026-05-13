from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("backend", "0005_review"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContactMessage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("subject", models.CharField(blank=True, max_length=200)),
                ("message", models.TextField()),
                ("reply_message", models.TextField(blank=True, default="")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
