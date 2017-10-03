@extends('layouts.default')

@section('header')
    @include('includes.header')
@stop

@section('content')
    <h1 class="mt-4 mb-3">Danh sách sản phẩm</h1>
    @foreach ($categories as $category)
        @if(count($category->posts) > 0)
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="{{route('home.index')}}">Home</a>
              </li>
              <li class="breadcrumb-item active">
                  <a href="{{route('danh_muc_bai_viet', ['category_slug' => $category->slug])}}">{{$category->name }}</a>
              </li>
            </ol>

            @foreach($category->posts->chunk(2) as $posts)
                <div class="row">
                @foreach($posts as $post)
                    <div class="col-lg-6 portfolio-item">
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
        @endif
    @endforeach
@stop