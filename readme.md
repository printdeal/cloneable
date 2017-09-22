# How to use:

## Default usage:

Add `js-cloneable` class to the object you want to clone. Within this object apply the `js-cloneable-add` and `js-cloneable-remove` classes to your controls.

```
$('.js-cloneable').each(function () {
    new Cloneable(this);
});
```

## Advanced usage:

Add any class to the object you want to clone. And use the options to define classes for the controls. You can also change the slide duration this way.

```
$('.anything-you-want').each(function () {
    new Cloneable(this, {
        addSelector: '.anything-you-want',
        removeSelector: '.anything-you-want',
        slideDuration: 200, // In milliseconds
        dataAttribute: 'data-ajax-url', // Will take priority over href
        onBeforeAddHtml: function (response) { // Will fire after successful add request, but before adding html. Receives response object.
            return response; // Should return html;
        }
    });
});
```

You can also check out the demo and inspect to better understand how it works.