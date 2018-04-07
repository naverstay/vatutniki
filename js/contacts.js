var map, myPlacemark;

function init() {
    map = new ymaps.Map("ymap", {
        controls: [],
        center: [55.606264, 37.617318],
        zoom: 14
    });

    myPlacemark = new ymaps.Placemark([55.608264, 37.617318], {
        hintContent: 'Новые Ватутинки',
    }, {
        balloonShadow: false,
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'i/pin.png',
        // Размеры метки.
        iconImageSize: [99, 106],
        iconImageOffset: [-50, -53],
        balloonPanelMaxMapArea: 0,
        // Не скрываем иконку при открытом балуне.
        hideIconOnBalloonOpen: false,
        // И дополнительно смещаем балун, для открытия над иконкой.
        // balloonOffset: [3, -15]
    });

    map.geoObjects.add(myPlacemark);
}

ymaps.ready(init);
