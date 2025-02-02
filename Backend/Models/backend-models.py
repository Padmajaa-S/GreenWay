from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('PLANNED', 'Planned'),
            ('IN_PROGRESS', 'In Progress'),
            ('COMPLETED', 'Completed'),
            ('ON_HOLD', 'On Hold')
        ]
    )

class Investment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='investments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    category = models.CharField(
        max_length=50,
        choices=[
            ('ROUTE_OPTIMIZATION', 'Route Optimization'),
            ('WAREHOUSE_AUTOMATION', 'Warehouse Automation'),
            ('QUALITY_CONTROL', 'Quality Control'),
            ('STAFF_TRAINING', 'Staff Training'),
            ('SOFTWARE_SYSTEMS', 'Software Systems')
        ]
    )
    
    class Meta:
        indexes = [
            models.Index(fields=['date', 'category'])
        ]

class Return(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='returns')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    
    class Meta:
        indexes = [
            models.Index(fields=['date'])
        ]

class Cost(models.Model):
    date = models.DateField()
    category = models.CharField(
        max_length=50,
        choices=[
            ('FUEL', 'Fuel'),
            ('MAINTENANCE', 'Maintenance'),
            ('LABOR', 'Labor'),
            ('PACKAGING', 'Packaging')
        ]
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    vehicle = models.ForeignKey('Vehicle', null=True, blank=True, on_delete=models.SET_NULL)
    
    class Meta:
        indexes = [
            models.Index(fields=['date', 'category'])
        ]

class Revenue(models.Model):
    date = models.DateField()
    category = models.CharField(
        max_length=50,
        choices=[
            ('ELECTRONICS', 'Electronics'),
            ('FASHION', 'Fashion'),
            ('HOME_LIVING', 'Home & Living'),
            ('BEAUTY', 'Beauty'),
            ('SPORTS', 'Sports')
        ]
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    order_count = models.IntegerField()
    
    class Meta:
        indexes = [
            models.Index(fields=['date', 'category'])
        ]

class Vehicle(models.Model):
    vehicle_id = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=50)
    purchase_date = models.DateField()
    last_maintenance_date = models.DateField()

class MaintenanceLog(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='maintenance_logs')
    date = models.DateField()
    type = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['date', 'type'])
        ]

class LaborCost(models.Model):
    date = models.DateField()
    regular_hours = models.DecimalField(max_digits=8, decimal_places=2)
    overtime_hours = models.DecimalField(max_digits=8, decimal_places=2)
    regular_rate = models.DecimalField(max_digits=8, decimal_places=2)
    overtime_rate = models.DecimalField(max_digits=8, decimal_places=2)
    benefits_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        indexes = [
            models.Index(fields=['date'])
        ]

class ROIMetrics(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='roi_metrics')
    date = models.DateField()
    investment_amount = models.DecimalField(max_digits=12, decimal_places=2)
    returns_amount = models.DecimalField(max_digits=12, decimal_places=2)
    roi_percentage = models.DecimalField(max_digits=7, decimal_places=2)
    payback_period_months = models.DecimalField(max_digits=5, decimal_places=1)
    npv = models.DecimalField(max_digits=12, decimal_places=2)
    irr = models.DecimalField(max_digits=5, decimal_places=2)
    
    class Meta:
        indexes = [
            models.Index(fields=['date', 'roi_percentage'])
        ]

    def calculate_roi(self):
        if self.investment_amount > 0:
            self.roi_percentage = ((self.returns_amount - self.investment_amount) / 
                                 self.investment_amount * Decimal('100.0'))
        return self.roi_percentage

class DailyMetrics(models.Model):
    date = models.DateField(unique=True)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2)
    total_costs = models.DecimalField(max_digits=12, decimal_places=2)
    gross_margin = models.DecimalField(max_digits=5, decimal_places=2)
    average_order_value = models.DecimalField(max_digits=8, decimal_places=2)
    returns_count = models.IntegerField()
    returns_value = models.DecimalField(max_digits=12, decimal_places=2)
    
    class Meta:
        indexes = [
            models.Index(fields=['date'])
        ]

    def calculate_margin(self):
        if self.total_revenue > 0:
            self.gross_margin = ((self.total_revenue - self.total_costs) / 
                               self.total_revenue * Decimal('100.0'))
        return self.gross_margin
