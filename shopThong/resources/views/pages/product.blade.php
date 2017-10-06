@extends('layouts.default')

@section('content')

<!-- Page Heading/Breadcrumbs -->
@component('partials.page_heading')
Danh sach san pham
@endcomponent

<div class="row">
    <div class="col-sm-3">
        @includeIf('includes.sidebar', ['sidebars' => $categorySideBars])
    </div>
    <div class="col-sm-9">
        
    </div>
</div>
@stop