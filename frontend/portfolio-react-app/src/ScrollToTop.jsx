import {useLocation} from "react-router-dom";
import {useLayoutEffect} from "react";

export function ScrollToTop() {
        const {pathname} = useLocation();

        useLayoutEffect(() => {
            const regexp = new RegExp('[a-z]{2}/projects/.');

            // Scroll to the top of the page when the route changes
            // except with project filters
            if (!regexp.test(pathname)) {
                window.scrollTo({top: 0, left: 0, behavior: 'instant'});
            }
        }, [pathname]);

        return null;
}