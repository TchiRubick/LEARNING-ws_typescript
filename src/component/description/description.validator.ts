import { trim } from "lodash";

class Descriptionvalidator {

    public inputStringNotNull(param?: string) {
        if (param === null) { return false; }

        if (trim(param) === "") { return false; }

        return true;
    }
}

export default Descriptionvalidator;
