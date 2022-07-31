from django.urls import path

from applications.views import ListAllApplications, ListLatestApplications, GetDashboardGraphData, FilteringApplicationView, RetrieveUpdateApplication, RetrieveApplicationsCV

urlpatterns = [
    # /backend/api/applications/

    path('loadCV/<int:pk>', RetrieveApplicationsCV.as_view()),
    path('<int:pk>', RetrieveUpdateApplication.as_view()),
    path('all/', ListAllApplications.as_view()),
    path('latest/<int:num>', ListLatestApplications.as_view()),
    path('filter/', FilteringApplicationView.as_view()),
    path('graph_data/dashboard/', GetDashboardGraphData.as_view()),
]