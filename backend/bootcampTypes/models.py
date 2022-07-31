from django.db import models
from django.utils.translation import gettext_lazy as _


class BootcampType(models.Model):
    type = models.CharField(
        verbose_name=_('Type'),
        max_length=200,
        unique=True
    )
    name = models.CharField(
        verbose_name=_('name'),
        max_length=100,
    )
    interviewer_email = models.EmailField(
        verbose_name=_('Interviewer\'s email address'),
        max_length=200,
        blank=True,
        help_text='Person who is going to conduct the personal interview. '
                  'Also should be the owner of the calendly link. '
                  'This email will be used as CC recipient on the automatically sent email to the applicant.',
    )
    interviewer_calendly_link = models.URLField(
        verbose_name=_('Interviewer\'s calendly link'),
        max_length=250,
        blank=True,
        help_text='Needed for bootcamps with personal interviews. '
                  'Calendly link will be sent automatically to applicants. '
                  'Interviewer email will be used as CC recipient.',
    )

    def __str__(self):
        return self.name
