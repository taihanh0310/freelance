<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>    
    <title>@yield('page_title', 'Kho máy nhôm nhựa')</title>
    @include('includes.head')

  </head>
  <body class="app-container"> 
   <!-- wpf loader Two -->
    <div id="wpf-loader-two">          
      <div class="wpf-loader-two-inner">
        <span>Đang tải ... </span>
      </div>
    </div> 
    <!-- / wpf loader Two -->       
  <!-- SCROLL TOP BUTTON -->
    <a class="scrollToTop" href="#">
        <i class="fa fa-chevron-up"></i>
    </a>
  <!-- END SCROLL TOP BUTTON -->

  <!-- Start header section -->
  @include('includes.header')
  <!-- / header section -->
  <!-- menu -->
  @include('includes.menuTop')
  
  @yield('topBanner')
  
  <div id="main_content">
      @yield('slider')
      
      @yield('content')
  </div>
  
  <!-- Subscribe section -->
 @include('includes.subscribe')
  <!-- / Subscribe section -->

  <!-- footer -->  
  @include('includes.footer')
  <!-- / footer -->

  <!-- Login Modal -->  
  <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">                      
        <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4>Đăng nhập hoặc đăng ký</h4>
          <form class="aa-login-form" action="">
            <label for="">Email<span>*</span></label>
            <input type="text" placeholder="Username or email">
            <label for="">Mật khẩu<span>*</span></label>
            <input type="password" placeholder="Password">
            <button class="aa-browse-btn" type="submit">Đăng nhập</button>
            <label for="rememberme" class="rememberme"><input type="checkbox" id="rememberme"> Ghi nhớ mật khẩu </label>
            <p class="aa-lost-password"><a href="#">Quên mật khẩu?</a></p>
            <div class="aa-register-now">
              Quý vị chưa có tài khoản?<a href="account.html">Đăng ký ngay!</a>
            </div>
          </form>
        </div>                        
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>    

  </body>
</html>