# Tagged Unions

They can be defined and used like so:

```spectre
val math = use("std/math")

union Shape = {
    Circle(f64) | Rect(f64, f64) | Triangle(f64, f64, f64)
}

fn area(s: Shape) f64 = {
    match s {
        Circle r         => { return 3.14159 * r * r }
        Rect w, h        => { return w * h }
        Triangle a, b, c => {
            val sp = (a + b + c) / 2.0
            return math.sqrt(sp * (sp - a) * (sp - b) * (sp - c))
        }
    }
}      
```
