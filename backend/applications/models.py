from datetime import date
from django.utils.translation import gettext_lazy as _
from django.db import models
from django_extensions.db.models import TimeStampedModel


class Application(TimeStampedModel):
    bootcamp = models.ForeignKey(
        verbose_name=_('bootcamps'),
        to='bootcamps.Bootcamp',
        related_name='applications',
        on_delete=models.PROTECT
    )
    currency = models.CharField(
        verbose_name='currency',
        max_length=3,
        choices=(
            ('CHF', 'CHF'),
            ('EUR', 'EUR'),
        ),
    )
    # personal data
    first_name = models.CharField(
        verbose_name=_('first'),
        max_length=30
    )
    last_name = models.CharField(
        verbose_name=_('last'),
        max_length=30
    )
    street = models.CharField(
        verbose_name=_("street"),
        max_length=255,
        blank=True,
    )
    city = models.CharField(
        verbose_name=_("city"),
        max_length=100,
        blank=True,
    )
    zip = models.CharField(
        verbose_name=_("zip/postal code"),
        max_length=50,
        blank=True,
    )
    country = models.CharField(
        verbose_name=_("country"),
        max_length=100,
        blank=True,
    )
    company_email = models.EmailField(
        verbose_name=_("company email"),
        blank=True,
    )
    company_name = models.CharField(
        verbose_name=_("company name"),
        max_length=100,
        blank=True,
    )
    # street, zip, city, country
    email = models.EmailField(
        verbose_name=_("email")
    )
    linkedin_profile = models.CharField(
        verbose_name=_('linkedin profile'),
        max_length=255,
        blank=True,
        null=True
    )
    cv = models.FileField(
        verbose_name=_("cv"),
        upload_to='cv/',
        null=True,
        blank=True
    )
    programming_level = models.CharField(
        verbose_name=_('coding'),
        max_length=30,
        null=True,
        blank=True
    )
    goal = models.TextField(
        verbose_name=_('goal'),
        null=True,
        blank=True
    )
    how_you_found_us = models.CharField(
        verbose_name=_("how you found us"),
        max_length=150,
        blank=True,
        null=True,
    )
    remote = models.CharField(
        verbose_name=_("remote"),
        max_length=150,
        choices=(
            ('yes', 'yes'),
            ('no', 'no'),
        ),
        blank=True,
        null=True,
    )
    referral_code = models.CharField(
        verbose_name=_("referral code"),
        max_length=2000,
        blank=True,
        null=True,
    )
    # metadata
    applied = models.DateField(
        verbose_name=_('applied'),
        null=True,
        blank=True,
        default=date.today,
    )
    unemployment_office = models.BooleanField(
        verbose_name=_('Unemployment Office'),
        default=False,
    )
    # applications process
    personal = models.DateTimeField(
        verbose_name=_('personal'),
        null=True,
        blank=True,
    )
    personal_passed = models.BooleanField(
        verbose_name=_('p. passed'),
        help_text=_('setting this to true will trigger a notification'),
        null=True,
        blank=True,
    )
    personal_comments = models.TextField(
        verbose_name=_('personal interview comments'),
        null=True,
        blank=True
    )
    technical = models.DateTimeField(
        verbose_name=_('technical'),
        null=True,
        blank=True
    )
    technical_opt2 = models.DateTimeField(
        verbose_name=_('t. invite 2'),
        null=True,
        blank=True
    )
    technical_passed = models.BooleanField(
        verbose_name=_('t. passed'),
        null=True,
        blank=True,
    )
    technical_comments = models.TextField(
        verbose_name=_('technical interview comments'),
        null=True,
        blank=True
    )
    accepted = models.BooleanField(
        verbose_name=_('accepted'),
        null=True,
        blank=True,
    )
    preparation_work_access = models.BooleanField(
        verbose_name=_('preparation work access'),
        null=True,
        blank=True,
    )
    reserve_tuition_paid = models.BooleanField(
        verbose_name=_('deposit'),
        null=True,
        blank=True,
    )
    paid = models.BooleanField(
        verbose_name=_('paid'),
        null=True,
        blank=True,
    )
    notes = models.TextField(
        verbose_name=_('notes'),
        null=True,
        blank=True
    )
    status = models.CharField(
        verbose_name=_('status'),
        max_length=100,
        choices=(
            ('serious', 'Serious'),
            ('not_serious', 'Not Serious'),
            ('enrolled', 'Enrolled'),
            ('dropped_out', 'Dropped Out'),
            ('graduated', 'Graduated'),
            ('found_job', 'Found Job')
        ),
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ['-applied']
        # unique_together = [
        #     ('bootcamp', 'email'),
        # ]








