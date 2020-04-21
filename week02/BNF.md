"a"

"b"

<Program>::= "a"+ | "b"+
<Program>::=<Program> "a"+ | <Program> "b"+

<Number>::= "0" | "1" | "2" | ...... | "9"

<DecimalNumber>::= "0" | ((| "1" | "2" | ...... | "9")+ <Number>\* ) /0|[1-9][0-9]\*/ 正则

<AdditiveExpression>::= <DecimalNumber>

<AdditiveExpression>::= <AdditiveExpression> "+" <DecimalNumber>

<AdditiveExpression>::= <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>

<MultiplicativeExpression>::= <DecimalNumber> | <MultiplicativeExpression> "\*" <DecimalNumber> | <MultiplicativeExpression> "/" <DecimalNumber>





<PrimaryExpression>::= <DecimalNumber> | "(" <LogicalExpression> ")"

<MultiplicativeExpression>::= <PrimaryExpression> | <MultiplicativeExpression> "\*" <PrimaryExpression> | <MultiplicativeExpression> "/" <PrimaryExpression>

<AdditiveExpression>::= <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression> | <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression>::= <AdditiveExpression> | <LogicalExpression> "||" <AdditiveExpression> | <LogicalExpression>"&&" <AdditiveExpression>