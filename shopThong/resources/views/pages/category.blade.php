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
            @includeIf('includes.product_2_column', ['category' => $category])
        </div>
    </div>
@stop