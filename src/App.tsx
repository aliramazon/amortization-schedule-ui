import { Toaster } from "./design-system/toaster";
import { AmortizationCalculator } from "./pages/amortization-calculator/amortization-calculator";

export const App = () => {
    return (
        <>
            <AmortizationCalculator />
            <Toaster />
        </>
    );
};
