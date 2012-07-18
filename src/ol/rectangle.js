goog.provide('ol.Rectangle');

goog.require('goog.asserts');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');



/**
 * @constructor
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 */
ol.Rectangle = function(minX, minY, maxX, maxY) {

  goog.asserts.assert(minX <= maxX);
  goog.asserts.assert(minY <= maxY);

  /**
   * @type {number}
   */
  this.minX = minX;

  /**
   * @type {number}
   */
  this.minY = minY;

  /**
   * @type {number}
   */
  this.maxX = maxX;

  /**
   * @type {number}
   */
  this.maxY = maxY;

};


/**
 * @param {ol.Rectangle} rectangle1 Rectangle.
 * @param {ol.Rectangle} rectangle2 Rectangle.
 * @return {boolean} Intersects.
 */
ol.Rectangle.intersects = function(rectangle1, rectangle2) {
  return rectangle1.minX <= rectangle2.maxX &&
      rectangle1.maxX >= rectangle2.minX &&
      rectangle1.minY <= rectangle2.maxY &&
      rectangle1.maxY >= rectangle2.minY;
};


/**
 * @return {ol.Rectangle} Clone.
 */
ol.Rectangle.prototype.clone = function() {
  return new ol.Rectangle(this.minX, this.minY, this.maxX, this.maxY);
};


/**
 * @param {goog.math.Coordinate} coordinate Coordinate.
 * @return {boolean} Contains.
 */
ol.Rectangle.prototype.contains = function(coordinate) {
  return this.minX <= coordinate.x && coordinate.x <= this.maxX &&
      this.minY <= coordinate.y && coordinate.y <= this.maxY;
};


/**
 * @return {goog.math.Coordinate} Center.
 */
ol.Rectangle.prototype.getCenter = function() {
  return new goog.math.Coordinate(
      (this.minX + this.maxX) / 2, (this.minY + this.maxY) / 2);
};


/**
 * @return {number} Height.
 */
ol.Rectangle.prototype.getHeight = function() {
  return this.maxY - this.minY;
};


/**
 * @return {goog.math.Size} Size.
 */
ol.Rectangle.prototype.getSize = function() {
  return new goog.math.Size(this.getWidth(), this.getHeight());
};


/**
 * @return {number} Width.
 */
ol.Rectangle.prototype.getWidth = function() {
  return this.maxX - this.minX;
};


/**
 * @param {goog.math.Coordinate} coordinate Coordinate.
 * @return {goog.math.Coordinate} Coordinate.
 */
ol.Rectangle.prototype.normalize = function(coordinate) {
  return new goog.math.Coordinate(
      (coordinate.x - this.minX) / this.getWidth(),
      (coordinate.y - this.minY) / this.getHeight());
};


/**
 * @return {string} String.
 */
ol.Rectangle.prototype.toString = function() {
  return '(' + [this.minX, this.minY, this.maxX, this.maxY].join(', ') + ')';
};
