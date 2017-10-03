<!-- Navigation -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="{{route('home.index')}}">{{Voyager::setting('site.title', 'VOYAGER')}}</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="about.html">SẢN PHẨM</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about.html">BÁO GIÁ MÁY NHÔM</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="services.html">TƯ VẤN</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">KHÁCH HÀNG</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="{{route('home.about')}}">VE CHUNG TOI</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="{{route('home.contact')}}">LIÊN HỆ</a>
            </li>
            <li class="nav-item">
              <a href="//www.facebook.com/evolable.asia.eva/" target="_blank" class="nav-link"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            </li>
            <li class="nav-item">
              <a href="//www.linkedin.com/company/evolable-asia" target="_blank" class="nav-link"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            </li>
            <li class="nav-item">
              <a href="//www.youtube.com/channel/UCtgpCyeLrUyl8-RatpZtqjQ" target="_blank" class="nav-link"><i class="fa fa-youtube" aria-hidden="true"></i></a>
            </li>
            <li class="nav-item">
              <a href="//www.instagram.com/evolable.asia/" target="_blank" class="nav-link"><i class="fa fa-instagram" aria-hidden="true"></i></a>
            </li>
            <li class="nav-item">
              <a href="{{route('home.contact')}}" target="_blank" class="nav-link"><i class="fa fa-mobile" aria-hidden="true"></i> Hot line: </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>