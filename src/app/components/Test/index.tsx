export default function Test() {
    return (
        <>
            <h1>Fórmulas Básicas no Excel</h1>
            <ul>
                <li>
                    <strong>Soma:</strong> <code>=SOMA(A1:A10)</code>
                </li>
                <li>
                    <strong>Média:</strong> <code>=MÉDIA(B1:B5)</code>
                </li>
                <li>
                    <strong>SE:</strong>{" "}
                    <code>
                        =SE(C1&gt;10, &quot;Aprovado&quot;,
                        &quot;Reprovado&quot;)
                    </code>
                </li>
            </ul>
        </>
    );
}
