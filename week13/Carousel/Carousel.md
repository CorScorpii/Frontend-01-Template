Carousel

    state
        activeIndex
    property
        loop time imglist autoplay color forward
    attribute
        startIndex loop time imglist autoplay color forward
    children
        2
        append remove add
    event
        change click hover swipe resize doubleclick
    method
        next() prev() goto()
        play() stop()
    config
        mode: 'useRAF', 'useTimeout
