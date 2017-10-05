@extends('layouts.default')

@section('content')

<!-- Page Heading/Breadcrumbs -->
@component('partials.page_heading')
Danh sach san pham
@endcomponent

@component('partials.breadcrumb')
@slot('route_parent')
{{route('home.index')}}
@endslot
@slot('parent_name')
Trang chu
@endslot
@slot('child_name')
{{$category->name}}
@endslot
@endcomponent

<div class="row">
    <div class="col-sm-3">
        @includeIf('includes.sidebar', ['sidebars' => $categorySideBars])
    </div>
    <div class="col-sm-9">
        @foreach($category->posts->chunk(1) as $posts)
        <div class="row">
            @foreach($posts as $post)
            <div class="col-sm-12 portfolio-item">
                <div class="card h-100">
                    @if(isset($post->image))
                    <a href="{{route('danh_muc_bai_viet.bai_viet',['category_slug' => $category->slug, 'post_slug' => $post->slug] )}}"><img class="card-img-top" src="{{ filter_var($post->image, FILTER_VALIDATE_URL) ? $post->image : Voyager::image( $post->image ) }}" alt="{{$post->title}}"></a>
                    @else
                    <a href="{{route('danh_muc_bai_viet.bai_viet',['category_slug' => $category->slug, 'post_slug' => $post->slug] )}}"><img class="card-img-top" src="http://placehold.it/700x400" alt="{{$post->title}}"></a>
                    @endif
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="{{route('danh_muc_bai_viet.bai_viet',['category_slug' => $category->slug, 'post_slug' => $post->slug] )}}">{{$post->title}}</a>
                        </h4>
                        <p class="card-text">{{$post->excerpt}}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @endforeach
        <div class="row">
            <!-- Post Content Column -->
        <div class="col-lg-8">

          <!-- Preview Image -->
          <img class="img-fluid rounded" src="http://placehold.it/900x300" alt="">

          <hr>

          <!-- Date/Time -->
          <p>Posted on January 1, 2017 at 12:00 PM</p>
          <div class="fb-like" data-href="{{route('danh_muc_bai_viet.bai_viet',['category_slug' => $category->slug, 'post_slug' => $post->slug] )}}" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
          <hr>

          <!-- Post Content -->
          <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>

          <blockquote class="blockquote">
            <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in
              <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>

          <hr>

          <!-- Comments Form -->
          <div class="card my-4">
            <h5 class="card-header">Leave a Comment:</h5>
            <div class="fb-comments" data-href="{{route('danh_muc_bai_viet.bai_viet',['category_slug' => $category->slug, 'post_slug' => $post->slug] )}}" data-numposts="5"></div>
          </div>
        </div>
        </div>
    </div>
</div>
@stop