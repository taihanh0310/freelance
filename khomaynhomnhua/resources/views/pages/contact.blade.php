@extends('layouts.master')
@section('content')
<section id="aa-contact">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="aa-contact-area">
                    <div class="aa-contact-top">
                        <h2>Chúng tôi đang chờ để hổ trợ bạn ... </h2>
                        <p>Hãy kết nối với chúng tôi, bạn sẽ được tư vân cũng như có được sự hài lòng từ những sản phẩm tốt nhất.</p>
                    </div>
                    <!-- contact map -->
                    <div class="aa-contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.3714257064535!2d-86.7550931378034!3d34.66757706940219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8862656f8475892d%3A0xf3b1aee5313c9d4d!2sHuntsville%2C+AL+35813%2C+USA!5e0!3m2!1sen!2sbd!4v1445253385137" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </div>
                    <!-- Contact address -->
                    <div class="aa-contact-address">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="aa-contact-address-left">
                                    <form class="comments-form contact-form" action="">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">                        
                                                    <input type="text" placeholder="Tên của bạn" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">                        
                                                    <input type="email" placeholder="Email" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">                        
                                                    <input type="text" placeholder="Tiêu đề email" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">                        
                                                    <input type="text" placeholder="Công ty" class="form-control">
                                                </div>
                                            </div>
                                        </div>                  

                                        <div class="form-group">                        
                                            <textarea class="form-control" rows="3" placeholder="Nội dung"></textarea>
                                        </div>
                                        <button class="aa-secondary-btn">Gửi</button>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="aa-contact-address-right">
                                    <address>
                                        <h4>Smart Machine</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum modi dolor facilis! Nihil error, eius.</p>
                                        <p><span class="fa fa-home"></span>748 Lê Thị Riêng, Thới An, Quận 12, HCM, VN</p>
                                        <p><span class="fa fa-phone"></span>0971089389 - 0916540698</p>
                                        <p><span class="fa fa-envelope"></span>Email: sale@khomaynhomnhua.vn</p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@stop