"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Box, Building2, Calculator, Cuboid, DraftingCompass, GraduationCap, Linkedin, Mail, MapPin, Menu, PenTool, Phone, Ruler, Target, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const Scene = dynamic(() => import("./scene"), { ssr: false });

const projects = [
  { title: "Casa Horizonte", type: "Residencial", place: "Chiclayo, PE", year: "2025", image: "/images/house-exterior.png", description: "Vivienda contemporánea de espacios amplios, patios protegidos y una conexión serena con el paisaje del norte.", software: ["AutoCAD", "SketchUp", "Twinmotion"] },
  { title: "Interior Lumen", type: "Interiorismo", place: "Pimentel, PE", year: "2025", image: "/images/interior-lumen.png", description: "Remodelación donde la luz natural, la escala y las texturas cálidas construyen una experiencia doméstica refinada.", software: ["AutoCAD", "Revit", "Enscape"] },
  { title: "Pabellón Pomalca", type: "Equipamiento", place: "Lambayeque, PE", year: "2024", image: "/images/project-pavilion.png", description: "Un espacio colectivo permeable que vincula paisaje, cultura local y encuentro mediante una materialidad honesta.", software: ["Revit", "SketchUp", "Twinmotion"] },
];

const services = [
  ["01", "Diseño Arquitectónico", "Espacios que responden al lugar, al clima y a quien los habita.", DraftingCompass],
  ["02", "Diseño Interior", "Atmósferas sensibles donde luz y materia construyen identidad.", PenTool],
  ["03", "Planimetría", "Documentación rigurosa, clara y lista para ejecución.", Ruler],
  ["04", "Modelado BIM", "Coordinación precisa del proyecto en todas sus disciplinas.", Cuboid],
  ["05", "Visualización 3D", "Imágenes inmersivas que comunican cada decisión.", Box],
  ["06", "Expedientes Técnicos", "Desarrollo integral para una obra sin improvisaciones.", Building2],
  ["07", "Metrados y Presupuestos", "Control detallado de cantidades, costos y recursos.", Calculator],
] as const;

const software = [
  ["AutoCAD", "AC", 95, "Avanzado"],
  ["SketchUp", "SU", 95, "Avanzado"],
  ["Twinmotion", "TM", 90, "Avanzado"],
  ["Enscape", "EN", 90, "Avanzado"],
  ["Revit", "RV", 80, "Intermedio"],
] as const;
const certifications = ["Modelador BIM Revit Arquitectura", "Modelador BIM Revit Estructura", "Metrados con BIM Revit", "Metrados, Costos y Presupuesto con S10", "BIM + Inteligencia Artificial"];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .85, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Cursor() {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 38 }); const sy = useSpring(y, { stiffness: 500, damping: 38 });
  useEffect(() => { const move = (e: MouseEvent) => { x.set(e.clientX - 8); y.set(e.clientY - 8); }; addEventListener("mousemove", move); return () => removeEventListener("mousemove", move); }, [x, y]);
  return <motion.div className="cursor" style={{ x: sx, y: sy }} />;
}

function Blueprint() {
  return <svg className="blueprint-art" viewBox="0 0 520 340" fill="none" aria-hidden="true">
    <defs><pattern id="draft-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" className="bp-grid"/></pattern></defs>
    <rect x="12" y="12" width="496" height="316" fill="url(#draft-grid)" className="bp-sheet"/>
    <g className="bp-dim"><path d="M38 22v-9m128 9v-9m135 9v-9m171 9v-9M38 16h434"/><path d="m38 16 7-3v6-3m121 0-7-3v6l7-3m0 0 7-3v6l-7-3m135 0-7-3v6l7-3m0 0 7-3v6l-7-3m171 0-7-3v6l7-3"/><text x="96" y="11">3.80</text><text x="224" y="11">4.20</text><text x="380" y="11">5.60</text></g>
    <g className="bp-walls"><path d="M38 32h434v276H38zM166 32v108H38m128-54h135V32m0 0v134h171M301 113h79v53m-214-26v168m0-98h135m0-44v142m0-83h171M380 166v59m0 0v83"/><path d="M45 39h114v94H45zM173 39h121v40H173zM308 39h157v67H308zM173 147h121v56H173zM308 173h65v45h-65zM387 173h78v45h-78zM173 217h121v84H173zM308 232h65v69h-65zM387 232h78v69h-78z"/></g>
    <g className="bp-openings"><path d="M88 140v-29a29 29 0 0 1 29 29M166 177h31a31 31 0 0 0-31-31M301 197h27a27 27 0 0 0-27-27M380 253h28a28 28 0 0 0-28-28M407 166v-27a27 27 0 0 1 27 27"/><path d="M60 32v7m20-7v7m20-7v7m20-7v7m20-7v7M472 62h-7m7 22h-7m-164 224v-7m22 7v-7m22 7v-7"/></g>
    <g className="bp-furniture"><path d="M55 52h92v43H55zM61 58h80v31H61zM191 96h78v31h-78zM198 103h64v17h-64zM322 54h124v34H322zM332 60h40v22h-40m48-22h56v22h-56M189 157h82v32h-82zM194 162h72v22h-72zM187 234h95v52h-95zM194 241h81v38h-81zM319 247h43v37h-43z"/><circle cx="339" cy="195" r="14"/><path d="M323 195h32m-16-16v32M403 248h44v24h-44zM411 278h28M61 228h81v51H61zM68 235h67v37H68z"/></g>
    <g className="bp-landscape"><circle cx="75" cy="182" r="18"/><circle cx="75" cy="182" r="10"/><path d="m75 164-6 18 6 18 6-18-6-18Zm43 12c13 0 23 10 23 23s-10 23-23 23-23-10-23-23 10-23 23-23Z"/></g>
    <g className="bp-axis"><path d="M28 32h-12m12 108h-12m12 168h-12M38 318v12m128-12v12m135-12v12m171-12v12"/><circle cx="16" cy="32" r="7"/><circle cx="16" cy="140" r="7"/><circle cx="16" cy="308" r="7"/><text x="13" y="35">A</text><text x="13" y="143">B</text><text x="13" y="311">C</text><text x="35" y="338">1</text><text x="163" y="338">2</text><text x="298" y="338">3</text><text x="469" y="338">4</text></g>
    <g className="bp-labels"><text x="76" y="122">TERRAZA</text><text x="205" y="72">ACCESO</text><text x="357" y="101">COCINA</text><text x="209" y="199">ESTAR</text><text x="316" y="221">S.H.</text><text x="410" y="221">ESTUDIO</text><text x="209" y="296">DORM. 01</text><text x="315" y="296">S.H.</text><text x="407" y="296">DORM. 02</text></g>
    <g className="bp-north"><circle cx="485" cy="42" r="13"/><path d="m485 23 5 21-5-4-5 4 5-21Z"/><text x="481" y="63">N</text></g>
  </svg>;
}

function BuildingWireframe({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 420 360" fill="none" aria-hidden="true"><path d="M28 309 120 180l133-46 139 86-6 93H28ZM120 180v133m133-179v179m139-93-139 60-133-49-92 78m225-175-4-61-129 42v65m129-107 139 76v71M120 115l133 64 139-30M67 257l53-77 133 54 133-45M91 222v91m54-123v123m54-103v103m104-154v154m42-130v130"/><path d="m28 309 225-29 133 33M120 115 28 220l92-40 133-46 139 86M145 123v42m54-60v44m104-43v73m42-51v77"/><circle cx="253" cy="134" r="4"/></svg>;
}

export default function Portfolio() {
  const [menu, setMenu] = useState(false); const [loaded, setLoaded] = useState(false);
  const [project, setProject] = useState<(typeof projects)[number] | null>(null); const [certificate, setCertificate] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null); const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const { scrollY, scrollYProgress } = useScroll(); const parallax = useTransform(scrollY, [0, 900], [0, 90]); const reverse = useTransform(scrollY, [0, 900], [0, -55]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1450); return () => clearTimeout(t); }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => gsap.to(el, { yPercent: -12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.1 } }));
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((el) => gsap.fromTo(el, { clipPath: "inset(12% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", scrollTrigger: { trigger: el, start: "top 90%", end: "top 45%", scrub: .7 } }));
    }, root);
    return () => ctx.revert();
  }, []);
  useEffect(() => { document.body.style.overflow = project || certificate || menu ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [project, certificate, menu]);

  return <main ref={root}>
    <AnimatePresence>{!loaded && <motion.div className="loader" exit={{ y: "-100%" }} transition={{ duration: .8, ease: [.76, 0, .24, 1] }}><div className="loader-mark">CP<span>ARQUITECTURA · DISEÑO</span></div><motion.div className="loader-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1 }} /></motion.div>}</AnimatePresence>
    <Cursor /><motion.div className="progress" style={{ scaleX: progress }} />

    <header className="nav"><a href="#inicio" className="brand">CP<span>ARQUITECTURA</span></a><nav className="nav-links"><a href="#proyectos">Proyectos</a><a href="#sobre-mi">Perfil</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></nav><div className="nav-actions"><ThemeToggle /><button className="icon-btn mobile-menu" aria-label="Menú" onClick={() => setMenu(!menu)}>{menu ? <X size={18}/> : <Menu size={18}/>}</button></div></header>
    <AnimatePresence>{menu && <motion.div className="menu-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{["Proyectos", "Sobre mí", "Servicios", "Contacto"].map((item, i) => <a key={item} href={["#proyectos", "#sobre-mi", "#servicios", "#contacto"][i]} onClick={() => setMenu(false)}>{item}</a>)}</motion.div>}</AnimatePresence>

    <section id="inicio" className="hero-collage">
      <div className="hero-paper"/><div className="hero-gridlines"/><div className="hero-ambient hero-ambient-one"/><div className="hero-ambient hero-ambient-two"/>
      <motion.div className="hero-sand-orb" initial={{ scale:.8,opacity:0 }} animate={loaded?{scale:1,opacity:1}:{}} transition={{duration:1.2,ease:[.22,1,.36,1]}}/>
      <div className="hero-ghost-plan"><Blueprint/></div><BuildingWireframe className="wireframe wireframe-left"/><BuildingWireframe className="wireframe wireframe-right"/>
      <motion.div className="marble-block marble-black" initial={{ y:-40,opacity:0 }} animate={loaded?{y:0,opacity:1}:{}} transition={{delay:.35,duration:.9}}/><motion.div className="marble-block marble-beige" initial={{ x:40,opacity:0 }} animate={loaded?{x:0,opacity:1}:{}} transition={{delay:.5,duration:.9}}/>
      <div className="hero-dots dots-one"/><div className="hero-dots dots-two"/><div className="dimension-line dimension-one"><span>12.80</span></div><div className="dimension-line dimension-two"><span>07.25</span></div><div className="editorial-number">01 <i/></div>
      <motion.div className="hero-words" initial={{ opacity: 0, x: -35 }} animate={loaded ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1 }}><div className="eyebrow"><span/> Arquitecta & Diseñadora · Chiclayo, Perú</div><h1>Claudia<br/>Carolina<br/><em>Perales Chávez</em></h1><p>Diseño Arquitectónico <i>•</i> BIM <i>•</i> Visualización 3D <i>•</i> Interiorismo</p><div className="hero-actions"><a className="button dark" href="#proyectos">Ver proyectos <ArrowDownRight size={17}/></a><a className="button outline" href="#contacto">Contactar <ArrowUpRight size={17}/></a></div><div className="hero-facts"><b>+20 <small>Proyectos</small></b><span>AutoCAD</span><span>SketchUp</span><span>Revit</span><span>Twinmotion</span></div></motion.div>
      <div className="visual-collage">
        <motion.figure className="collage-house" style={{ y: parallax }}><Image src="/images/house-exterior.png" fill priority alt="Vivienda contemporánea Casa Horizonte" sizes="55vw"/></motion.figure>
        <motion.figure className="collage-portrait" style={{ y: reverse }}><Image src="/images/claudia-profile.png" fill priority alt="Retrato editorial de Claudia Perales" sizes="28vw"/></motion.figure>
        <motion.figure className="collage-interior" style={{ y: reverse }}><Image src="/images/interior-lumen.png" fill alt="Interior contemporáneo Lumen" sizes="28vw"/></motion.figure>
        <div className="collage-plan"><Blueprint/><span>PLANTA · 01</span></div><div className="sketch-lines"><span/><span/><span/></div><div className="scene"><Scene/></div>
      </div><a href="#sobre-mi" className="scroll-cue">Explorar <span><ArrowDownRight size={15}/></span></a>
      <div className="hero-lower">
        <div className="hero-metrics"><div><Building2/><b>+20</b><span>Proyectos<br/>realizados</span></div><div><GraduationCap/><b>5</b><span>Años de<br/>formación</span></div><div><Target/><b>100%</b><span>Compromiso<br/>y dedicación</span></div></div>
        <div className="hero-service-strip">
          {[{name:"Diseño arquitectónico",copy:"Espacios que inspiran",image:"/images/house-exterior.png"},{name:"Diseño interior",copy:"Funcionalidad y estética",image:"/images/interior-lumen.png"},{name:"Modelado BIM",copy:"Precisión en cada detalle",image:"/images/project-pavilion.png"},{name:"Visualización 3D",copy:"Ideas que cobran vida",image:"/images/house-exterior.png"}].map((item) => <a href="#servicios" key={item.name}><Image src={item.image} fill alt="" sizes="25vw"/><div><b>{item.name}</b><span>{item.copy}</span><ArrowRight size={17}/></div></a>)}
        </div>
      </div>
    </section>

    <section id="sobre-mi" className="about section-pad concrete-texture"><Reveal className="section-label"><span>01</span> PERFIL</Reveal><div className="about-editorial"><Reveal className="about-photo"><div><Image src="/images/claudia-profile.png" fill alt="Claudia Perales, arquitecta y diseñadora" sizes="360px"/></div><small>ARQUITECTURA CON PROPÓSITO</small></Reveal><Reveal className="about-copy"><h2>Diseño sensible.<br/><em>Precisión técnica.</em></h2><p>Arquitecta y diseñadora enfocada en crear espacios funcionales, sostenibles y visualmente atractivos. Especializada en modelado BIM, diseño interior, visualización 3D y documentación técnica.</p><a href="#contacto" className="text-link">Conversemos sobre tu proyecto <ArrowUpRight size={16}/></a></Reveal></div></section>

    <section id="proyectos" className="projects section-pad">
      <div className="projects-editorial-head"><Reveal><div className="section-label"><span>02</span> OBRA SELECCIONADA</div><h2>PROYECTOS<br/><em>destacados</em></h2></Reveal><Reveal><p>Arquitectura narrada desde el detalle,<br/>la funcionalidad y la experiencia.</p></Reveal></div>
      <div className="project-rows">{projects.map((item,i) => <motion.article className={`project-card project-row ${i%2 ? "project-reverse" : ""}`} key={item.title} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-12%"}} transition={{duration:.85,ease:[.22,1,.36,1]}}>
        <motion.button className="project-media" onClick={() => setProject(item)} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,delay:.2,ease:[.22,1,.36,1]}} whileHover={{y:-7}} aria-label={`Ver proyecto ${item.title}`}><Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 55vw" data-drift/><span className="project-overlay"><ArrowUpRight/></span></motion.button>
        <div className="project-info"><div className="project-kicker"><span>0{i+1}</span><span>{item.type}</span></div><h3>{item.title}</h3><div className="project-location"><span>{item.place}</span><i/><span>{item.year}</span></div><p>{item.description}</p><div className="project-software">{item.software.map((tool) => <span key={tool}>{tool}</span>)}</div><button className="project-link" onClick={() => setProject(item)}>Ver proyecto <ArrowRight size={16}/></button></div>
      </motion.article>)}</div>
    </section>

    <section className="experience section-pad"><Reveal className="section-label"><span>03</span> EXPERIENCIA</Reveal><div className="experience-grid"><Reveal><h2>Experiencia que<br/><em>construye visión.</em></h2></Reveal><Reveal><div className="timeline"><div className="timeline-dot"/><span>2024 — 2025</span><h3>Agroindustrial Pomalca</h3><h4>Gerencia de Desarrollo Inmobiliario</h4><ul><li>Lotizaciones</li><li>Remodelación de oficinas</li><li>Diseño de interiores</li><li>Centro de esparcimiento</li><li>Elaboración de planos</li><li>Expedientes técnicos</li></ul></div></Reveal></div></section>

    <section id="servicios" className="services section-pad"><Reveal className="section-label"><span>04</span> SERVICIOS</Reveal><Reveal><h2>Del concepto<br/>a la <em>realidad.</em></h2></Reveal><div className="service-cards">{services.map(([n,title,text,Icon]) => <motion.article key={title} initial={{ opacity:0,y:25 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} whileHover={{ y:-9 }}><span>{n}</span><Icon/><h3>{title}</h3><p>{text}</p><ArrowUpRight className="service-arrow"/></motion.article>)}</div></section>

    <section className="software section-pad"><div className="tools-top"><Reveal><div className="section-label"><span>05</span> SOFTWARE</div><h2>Herramientas para<br/><em>imaginar y construir.</em></h2></Reveal><Reveal><p>Un flujo digital integral para diseñar, coordinar, documentar y comunicar.</p></Reveal></div><div className="software-cards">{software.map(([name,abbr,value,level],i) => <motion.article key={name} className="software-card" initial={{ opacity:0,y:34 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,amount:.35 }} transition={{ duration:.65,delay:i*.08,ease:[.22,1,.36,1] }} whileHover={{ y:-10 }}><div className={`software-logo logo-${abbr.toLowerCase()}`}><span>{abbr}</span></div><div className="software-card-title"><h3>{name}</h3><span>{level}</span></div><div className="software-value"><motion.b initial={{ opacity:0,y:8 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:.25+i*.08 }}>{value}%</motion.b></div><div className="software-progress"><motion.i initial={{ scaleX:0 }} whileInView={{ scaleX:value/100 }} viewport={{ once:true,amount:.8 }} transition={{ duration:1.1,delay:.18+i*.08,ease:[.22,1,.36,1] }}/></div></motion.article>)}</div>
      <div className="cert-wrap"><div className="cert-head"><h3>Certificaciones</h3><div><button className="icon-btn" onClick={() => embla?.scrollPrev()}><ArrowLeft size={18}/></button><button className="icon-btn" onClick={() => embla?.scrollNext()}><ArrowRight size={18}/></button></div></div><div className="embla" ref={emblaRef}><div className="embla-track">{certifications.map((cert,i) => <button className="cert-card" key={cert} onClick={() => setCertificate(cert)}><span>0{i+1}</span><DraftingCompass/><h4>{cert}</h4><small>VER CREDENCIAL <ArrowUpRight size={13}/></small></button>)}</div></div></div>
    </section>

    <section id="contacto" className="contact section-pad"><div className="contact-plan"><Blueprint/></div><div className="contact-grid"><Reveal><div className="section-label light-label"><span>06</span> CONTACTO</div><h2>Hagamos espacio<br/>para algo <em>único.</em></h2><p>Cuéntame sobre tu próximo proyecto. Convirtamos una idea en un espacio con propósito.</p><div className="contact-info"><span><MapPin/>Chiclayo, Perú</span><a href="tel:+51996402875"><Phone/>+51 996 402 875</a><a href="mailto:clauperales20@gmail.com"><Mail/>clauperales20@gmail.com</a><a href="#"><Linkedin/>LinkedIn</a></div></Reveal><Reveal><form onSubmit={(e)=>e.preventDefault()}><label>Nombre<input required placeholder="Tu nombre"/></label><label>Email<input required type="email" placeholder="tu@email.com"/></label><label>Proyecto<select defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Diseño arquitectónico</option><option>Diseño interior</option><option>Modelado BIM</option><option>Visualización 3D</option></select></label><label>Tu idea<textarea required rows={3} placeholder="Cuéntame brevemente..."/></label><button className="button light">Enviar mensaje <ArrowUpRight size={17}/></button></form></Reveal></div><footer><div className="brand">CP<span>ARQUITECTURA</span></div><span>© 2026 CLAUDIA PERALES</span><a href="#inicio">VOLVER ARRIBA <ArrowRight size={14}/></a></footer></section>

    <AnimatePresence>{project && <motion.div className="project-modal" initial={{ y:"100%" }} animate={{ y:0 }} exit={{ y:"100%" }} transition={{ duration:.7,ease:[.76,0,.24,1] }}><button className="modal-close" onClick={() => setProject(null)}><X/> CERRAR</button><div className="modal-hero"><Image src={project.image} fill alt={project.title}/><div><span>{project.type} · {project.year}</span><h2>{project.title}</h2></div></div><div className="modal-story"><div><span>EL PROYECTO</span><p>{project.description}</p><h3>Proceso de diseño</h3><p>Investigación del contexto, estrategia bioclimática, desarrollo BIM y visualización iterativa para alinear espacio, técnica y experiencia.</p><div className="tags"><i>Revit</i><i>AutoCAD</i><i>SketchUp</i><i>Twinmotion</i></div></div><div className="modal-gallery"><figure><Image src="/images/interior-lumen.png" fill alt="Render interior"/></figure><figure className="modal-plan"><Blueprint/></figure></div></div></motion.div>}</AnimatePresence>
    <AnimatePresence>{certificate && <motion.div className="dialog-backdrop" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setCertificate(null)}><motion.div className="certificate-dialog" initial={{ scale:.85,y:20 }} animate={{ scale:1,y:0 }} exit={{ scale:.9,opacity:0 }} onClick={(e)=>e.stopPropagation()}><button onClick={() => setCertificate(null)}><X/></button><DraftingCompass/><span>CERTIFICACIÓN PROFESIONAL</span><h3>{certificate}</h3><p>Formación especializada aplicada al desarrollo y coordinación integral de proyectos.</p><small>CLAUDIA CAROLINA PERALES CHÁVEZ</small></motion.div></motion.div>}</AnimatePresence>
  </main>;
}
