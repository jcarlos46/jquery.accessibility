(function ($) {
    var cache = {};

    $.fn.accessibility = function (settings) {
        var config = {
            'self': this,
                'target': 'body',
                'suffix': 'px',
                'increment': 1,
                'contrastFile': 'contrast.css'
        };
        if (settings) {
            $.extend(config, settings);
        }

        var els = [{
            'name': 'plus',
                'label': 'Aumentar fonte',
                'method': function () {
                var target = $(config.target),
                    fontSize = parseInt(target.css('font-size'));
                if (cache.size === undefined) cache.size = fontSize;
                fontSize += config.increment;
                target.css('font-size', fontSize + config.suffix);
            }
        }, {
            'name': 'normal',
                'label': 'Fonte Normal',
                'method': function () {
                if (cache.size !== undefined) {
                    $(config.target).css('font-size', cache.size + config.suffix);
                }
            }
        }, {
            'name': 'less',
                'label': 'Diminuir fonte',
                'method': function () {
                var target = $(config.target),
                    fontSize = parseInt(target.css('font-size'));
                if (cache.size === undefined) cache.size = fontSize;
                fontSize -= config.increment;
                target.css('font-size', fontSize + config.suffix);
            }
        }, {
            'name': 'contrast',
                'label': 'Mudar contraste da página',
                'method': function () {
  				cache.contrasted = (cache.contrasted === undefined) ? false : !cache.contrasted;
					if(!cache.contrasted)
						$('head').append($('<link rel="stylesheet" type="text/css" href="' + config.contrastFile + '" class="accessibility-contrast-css" />'));
					else
						$('.accessibility-contrast-css').remove();
                }
        }];

        $.each(els, function (key, value) {
            var a = $('<a class="accessibility-' + value.name + '" href="#" onclick="return false;">' + value.label + '</a>');
            $(a).click(value.method);
            $(config.self).append(a);
        });

        return this;
    }
})(jQuery);
