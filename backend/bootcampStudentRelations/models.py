from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _
from bootcamps.models import Bootcamp

class BootcampStudentRelation(TimeStampedModel):
    class VisitedBootcampStatus(models.TextChoices):
        ACTIVE = 'active', _('Active')
        DROPPED_OUT = 'dropped_out', _('Dropped out')
        KICKED_OUT = 'kicked_out', _('Kicked out')
        GRADUATED = 'graduated', _('Graduated')
        FAILED = 'failed', _('Failed')

    bootcamp = models.ForeignKey(to=Bootcamp, null=True, on_delete=models.PROTECT, related_name='students')
    status = models.CharField(
        max_length=11,
        choices=VisitedBootcampStatus.choices,
        null=True,
        help_text='Set status to active when granting access to curriculum. '
                  'Add reason in "notes" if student leaves or gets kicked out of bootcamp.'
    )
    notes = models.TextField(blank=True, max_length=1000)

    # def __str__(self):
        # student_name = self.student.user.get_full_name()
        # bootcamp = self.bootcamp.name
        # return f'{student_name} attended {bootcamp}'