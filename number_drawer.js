function NumberDrawer(x, y) {
  this.x = x;
  this.y = y;

  // this.draw = function() {
  // }

  this.hits = function(m_x, m_y) {
    var d = dist(m_x,m_y,this.x,this.y);
    return d < 40 //I need to scale the 40
  }
}
