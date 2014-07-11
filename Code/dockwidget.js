/*
  The dock widget item is the smallest part of the dock window system, it will
  contain all of the contents for the actual widget.
*/
function wcDockWidget(title) {
  this.$container = null;
  this._parent = null;

  this._title = title;

  this._layout = null;

  this._pos = {
    x: 0.5,
    y: 0.5,
  };

  this._size = {
    x: 200,
    y: 200,
  };

  this._minSize = {
    x: 100,
    y: 100,
  };

  this._maxSize = {
    x: Infinity,
    y: Infinity,
  };

  this._scrollable = {
    x: true,
    y: true,
  };

  this._moveable = true;
  this._closeable = true;

  this._init();
};

wcDockWidget.prototype = {
  _init: function() {
    this._layout = new wcLayout(this.$container, this);
  },

  // Updates the size of the layout.
  _update: function() {
    this._layout._update();
  },

  // Gets the title for this dock widget.
  title: function() {
    return this._title;
  },

  // Retrieves the main widget container for this dock widget.
  layout: function() {
    return this._layout;
  },

  // Gets, or Sets the default position of the widget if it is floating.
  // Params:
  //    x, y    If supplied, sets the position (percentage value from 0 to 1).
  pos: function(x, y) {
    if (typeof x === 'undefined') {
      return {x: this._pos.x, y: this._pos.y};
    }
    this._pos.x = x;
    this._pos.y = y;
  },

  // Gets, or Sets the desired size of the widget.
  size: function(x, y) {
    if (typeof x === 'undefined') {
      return {x: this._size.x, y: this._size.y};
    }
    this._size.x = x;
    this._size.y = y;
  },

  // Gets, or Sets the minimum size of the widget.
  minSize: function(x, y) {
    if (typeof x === 'undefined') {
      return this._minSize;
    }
    this._minSize.x = x;
    this._minSize.y = y;
  },

  // Gets, or Sets the maximum size of the widget.
  maxSize: function(x, y) {
    if (typeof x === 'undefined') {
      return this._maxSize;
    }
    this._maxSize.x = x;
    this._maxSize.y = y;
  },

  // Gets, or Sets the scroll position of the window (if it is scrollable).
  // Params:
  //    x, y      If supplied, sets the scroll position of the window.
  // Returns:
  //    object    The scroll position of the window.
  scroll: function(x, y) {
    if (!this.$container) {
      return {x: 0, y: 0};
    }

    if (typeof x !== 'undefined') {
      this.$container.scrollLeft(x);
      this.$container.scrollTop(y);
    }

    return {
      x: this.$container.scrollLeft(),
      y: this.$container.scrollTop(),
    };
  },

  // Gets, or Sets whether the window is scrollable.
  // Params:
  //    x, y      If supplied, assigns whether the window is scrollable
  //              for each axis.
  // Returns:
  //    object    The current scrollable status.
  scrollable: function(x, y) {
    if (typeof x !== 'undefined') {
      this._scrollable.x = x? true: false;
      this._scrollable.y = y? true: false;
    }

    return {x: this._scrollable.x, y: this._scrollable.y};
  },

  // Sets, or Gets the moveable status of the window.
  moveable: function(enabled) {
    if (typeof enabled !== 'undefined') {
      this._moveable = enabled? true: false;
    }

    return this._moveable;
  },

  // Gets, or Sets whether this dock window can be closed.
  // Params:
  //    enabled     If supplied, toggles whether it can be closed.
  // Returns:
  //    bool        The current closeable status.
  closeable: function(enabled) {
    if (typeof enabled !== 'undefined') {
      this._closeable = enabled? true: false;
      if (this._parent) {
        this._parent._update();
      }
    }

    return this._closeable;
  },

  // Forces the window to close.
  close: function() {
    if (this._parent) {
      this._parent.$close.click();
    }
  },

  // Gets, or Sets a new container for this layout.
  // Params:
  //    $container          If supplied, sets a new container for this layout.
  //    parent              If supplied, sets a new parent for this layout.
  // Returns:
  //    JQuery collection   The current container.
  container: function($container) {
    if (typeof $container === 'undefined') {
      return this.$container;
    }

    this._layout.container(null);
    this.$container = $container;
    
    if (this.$container) {
      this._layout.container(this.$container);
    }
    return this.$container;
  },

  // Gets, or Sets the parent item for this layout.
  // Params:
  //    parent        If supplied, sets a new parent for this layout.
  // Returns:
  //    object        The current parent.
  parent: function(parent) {
    if (typeof parent === 'undefined') {
      return this._parent;
    }

    this._parent = parent;
    return this._parent;
  },
};