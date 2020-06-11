  window.helpers = {};
  window.selector = localStorage.getItem('selector') || 'body';
  window.helpers.createAxis = function (config) {

    var computed = getComputedStyle(config.parent);
    var x = "";
    var y = "";
    if (computed['display'] != 'flex') {
      return;
    }
    if (computed['flex-direction'].indexOf('row') > -1) {
      x = 'main-axis';
      y = 'cross-axis';

      if (computed['flex-direction'].indexOf('reverse') > -1) {
        x += " reverse";
      }

      if (computed['flex-wrap'] == 'wrap-reverse') {
        y += " reverse";
      }

    } else if (computed['flex-direction'].indexOf('column') > -1) {
      y = 'main-axis';
      x = 'cross-axis';

      if (computed['flex-direction'].indexOf('reverse') > -1) {
        y += " reverse";
      }

      if (computed['flex-wrap'] == 'wrap-reverse') {
        x += " reverse";
      }
    }

    var wrapper = document.createElement('div');
    var overlay = config.overlay || "";
    var htmlString = '<div aria-hidden="true" class="axis_overlay '+ overlay +'"><div class="axis y-axis ' + y + '"><span>y</span></div><div class="axis x-axis ' + x +'"><span>x</span></div>';


    // make sure we can show legend
    if (parseFloat(computed['width']) / 2 > 100 && parseFloat(computed['height']) / 2 > 55)  {
      htmlString += '<div class="legend"><div class="main-axis">Główna oś (main-axis)</div><div class="cross-axis">Oś przeciwstawna (cross-axis)</div></div></div>';
    }

    wrapper.innerHTML = htmlString;
    
    config.parent.appendChild(wrapper.firstChild);

  //  window.koduje.handledParents.push(config.parent);
    };
  window.helpers.removeAllAxis = function () {
    document.querySelectorAll('.axis_overlay').forEach(function (overlay) {
      overlay.parentNode.removeChild(overlay);
    });
  };
  window.helpers.drawAllFlexTips = function (config) {
    document.querySelectorAll(window.selector).forEach(function (container) {
      window.helpers.removeAllAxis();
      window.helpers.createAxis({
        parent: container
      });
    });
  }

//  document.addEventListener('mouseenter', window.helpers.drawAllFlexTips);


  // I dont really have any other simple idea for it.
  const styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  styleEl.innerHTML = `
${window.selector} {
  position: relative;
  pointer-events: all;
}

${window.selector}:hover > .axis_overlay {
  display: block;
}

.axis_overlay {
  z-index: 2;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.axis_overlay.visible {
  display: block;
}

.axis_overlay.hidden {
  display: none !important;
}
.axis_overlay .axis {
  content: '';
  display: block;
  position: absolute;
  opacity: 0.3;

  pointer-events: none;
  background: yellow;
  color: yellow;
}

.axis_overlay .main-axis {
  opacity: 0.8;
}

.axis_overlay .legend div {
  opacity: 1;
}


.axis_overlay .axis span {
  position: absolute;
}

.axis_overlay .x-axis::after {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid yellow;
  content: '';
  display: block;
  right: -5px;
  position: absolute;
  top: -7.5px;
}


.axis_overlay .y-axis::after {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid yellow;
  content: '';
  display: block;
  position: absolute;
  left: -5px;
  bottom: -6px;
  transform: rotate(-270deg);
}

.axis_overlay .x-axis span {
  right: 20px;
  top: 5px;
}

.axis_overlay .y-axis span {
  left: 10px;
  bottom: 20px;
}

.axis_overlay .x-axis {
  height: 5px;
  width: calc(100% - 10px);
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}


.axis_overlay .y-axis {
  width: 5px;
  height: calc(100% - 10px);
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
}

.axis_overlay .x-axis.reverse {
  left: initial;
  right: 0;
  transform: rotateY(180deg);
}

.axis_overlay .x-axis.reverse span {
  transform: rotateY(-180deg);
}

.axis_overlay .y-axis.reverse {
  bottom: 0;
  top: initial;
  transform: rotateX(180deg);
}

.axis_overlay .y-axis.reverse span {
  transform: rotateX(-180deg);
}

.axis_overlay .legend {
  width: 200px;
  font-size: 11px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  height: 55px;
  right: 0;
  bottom: 0;
  background: black;
  pointer-events:all;
}

.axis_overlay .legend div {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  padding: 3px;
}

.axis_overlay .legend .main-axis::before {
  opacity: 0.8;
}

.axis_overlay .legend .cross-axis::before {
  opacity: 0.3;
}

.axis_overlay .legend .main-axis::before,
.axis_overlay .legend .cross-axis::before {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: yellow;
  content: '';
  margin-right: 5px;
}
`;

