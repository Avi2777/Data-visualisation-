from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _


class Bootcamp(TimeStampedModel):
    name = models.CharField(
        verbose_name=_('name'),
        max_length=128,
    )
    bootcamp_type = models.ForeignKey(
        verbose_name=_('bootcamps type'),
        to='bootcampTypes.BootcampType',
        on_delete=models.PROTECT,
        related_name='bootcamps'
    )
    bootcamp_location = models.ForeignKey(
        verbose_name=_('bootcamps location'),
        to='bootcampLocations.BootcampLocation',
        on_delete=models.PROTECT,
        related_name='bootcamps'
    )
    early_apply_by = models.DateField(
        verbose_name=_('early apply by'),
    )
    apply_by = models.DateField(
        verbose_name=_('apply by'),
    )
    start_date = models.DateField(
        verbose_name=_('start date'),
    )
    end_date = models.DateField(
        verbose_name=_('end date'),
    )
    # metadata
    active = models.BooleanField(
        verbose_name=_('active'),
        default=True,
    )
    is_part_time = models.BooleanField(
        verbose_name=_('is part time'),
        default=False,
    )
    is_in_person = models.BooleanField(
        verbose_name=_('is in person'),
        default=False,
    )
    is_remote = models.BooleanField(
        verbose_name=_('is remote'),
        default=False,
    )

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        bootcamp_model = 'part-time' if self.is_part_time else 'full-time'
        return f'{self.bootcamp_type.name} ({bootcamp_model}), {self.bootcamp_location.location.capitalize()} | {self.start_date.strftime("%d %b %Y")} - ' \
               f'{self.end_date.strftime("%d %b %Y")}'
2