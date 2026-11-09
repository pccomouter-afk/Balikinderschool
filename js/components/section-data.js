import {teachers} from "../data/teachers.js";
import {partners} from "../data/partners.js";
import {testimonials} from "../data/testimonials.js";
import {gallery} from "../data/gallery.js";
import {renderTeachers} from "./teacher-carousel.js";
import {renderPartners} from "./partners.js";
import {renderTestimonials} from "./testimonial-carousel.js";
import {renderGallery} from "./gallery.js";
const map=[
["teachers",teachers,renderTeachers],
["partners",partners,renderPartners],
["testimonials",testimonials,renderTestimonials],
["gallery",gallery,renderGallery]
];
export function initDataSections(){
map.forEach(([key,items,render])=>{
document.querySelectorAll('[data-section="'+key+'"]').forEach((section)=>{
const host=section.querySelector("[data-host]");
const list=items;
const filled=host&&render(host,list,section.dataset);
section.hidden=!filled&&!section.hasAttribute("data-keep");
const fallback=section.querySelector("[data-empty]");
if(fallback)fallback.hidden=!!filled;
});
});
}
