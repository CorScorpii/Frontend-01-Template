//yc here
var y = (g) => ((f) => f(f))((self) => g((...args) => self(self)(...args)))

//use yc
var f = y((self) => (n) => (n < 0 ? 0 : n + self(n - 1)))

f(100) // 5050
