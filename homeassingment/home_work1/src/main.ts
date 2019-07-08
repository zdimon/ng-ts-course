import {some} from './export_lib'
import * as JQuery from "jquery";
const $ = JQuery.default;

	$('#plus').on('click', operation);
    $('#minus').on('click', operation);
    $('#multiplication').on('click', operation);
    $('#divine').on('click', operation);