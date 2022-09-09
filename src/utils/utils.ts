import { THOUSAND } from "@/data/constants";

function prettyNumber(value: number): string {
    if (value < THOUSAND) {
        return value.toString();
    }

    const RIGHT = value % THOUSAND;
    const LEFT = value / THOUSAND;
    const BIG = prettyNumber(Math.floor(LEFT));
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const LITTLE = RIGHT.toString().padStart(3, "0");

    return `${BIG} ${LITTLE}`;
}

export { prettyNumber };
