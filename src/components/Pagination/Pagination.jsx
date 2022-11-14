import './pagination.scss';

const PaginationSlider = {
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
    },
};

export default PaginationSlider;