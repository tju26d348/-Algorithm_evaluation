from django.conf.urls import url
from api import views

# from api.views import ProductViewSet

# router = DefaultRouter()
# router.register(r'product', views.ProductViewSet)

# api url 配置
urlpatterns = [
    # url(r'^', include(router.urls)),
    url(r'^index/$', views.index),
    url(r'^test/$', views.GetMessageView.as_view()),
    url(r'^runJob/$', views.run_job),
    url(r'^sayhello/$', views.say_hello),
    url(r'^getMethod/$', views.get_method),
    url(r'^compare/$', views.compare),
    url(r'^comparedetail/$', views.process_post_json),
    url(r'^classified/$', views.database_group),
]
