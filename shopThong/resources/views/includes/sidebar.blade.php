<div class="list-group">
    @foreach($sidebars as $category)
        <a href="{{route('danh_muc_bai_viet', ['category_slug' => $category->slug])}}" class="list-group-item {{ Request::fullUrl() == route('danh_muc_bai_viet', ['category_slug' => $category->slug]) ? 'active' : '' }}" >
            {{$category->name}}
            <span class="badge badge-default badge-pill">{{count($category->posts)}}</span>
        </a>
    @endforeach
</div>