<div class="list-group">
    @foreach($sidebars as $category)
        <a href="{{route('danh_muc_bai_viet', ['category_slug' => $category->slug])}}" class="list-group-item">{{$category->name}}</a>
    @endforeach
</div>