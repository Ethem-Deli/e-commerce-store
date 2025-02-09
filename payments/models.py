from django.db import models

class Payment(models.Model):
    stripe_payment_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=[("pending", "Pending"), ("completed", "Completed")])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.stripe_payment_id} - {self.status}"
