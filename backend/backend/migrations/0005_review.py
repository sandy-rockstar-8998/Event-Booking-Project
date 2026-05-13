from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("backend", "0004_createevent_delete_event"),
    ]

    operations = [
        migrations.CreateModel(
            name="Review",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("reviewer_name", models.CharField(max_length=100)),
                ("review_text", models.TextField()),
                (
                    "event_type",
                    models.CharField(
                        choices=[
                            ("birthday", "Birthday"),
                            ("babyshower", "Baby Shower"),
                            ("marriage", "Marriage"),
                            ("cultural", "Cultural"),
                        ],
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
