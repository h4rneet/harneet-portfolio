/* ========================================
   SKILLS FOLDERS
   ======================================== */

const folderCards =
    document.querySelectorAll(".folder-card");


folderCards.forEach((folderCard) => {

    const button =
        folderCard.querySelector(".folder-toggle");


    button.addEventListener("click", () => {

        const isAlreadyOpen =
            folderCard.classList.contains("is-open");


        /*
            Close every folder first.
        */

        folderCards.forEach((card) => {

            card.classList.remove("is-open");


            const cardButton =
                card.querySelector(".folder-toggle");


            cardButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });



        /*
            If clicked folder was closed,
            open it.
        */

        if (!isAlreadyOpen) {

            folderCard.classList.add("is-open");


            button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});



/* ========================================
   PROJECT DATA
   ======================================== */

const projects = [

    {
        title:
            "Innovation Hub",

        category:
            "Graphic Design · Visual Storytelling · Communications",

        description:
            "Select visual communication & graphic design work created for the Innovation Hub as a Graphic Designer + Communications Assistant.",

        placeholder:
            "Innovation Hub preview",

        image:
            "Assets/projects/workpreview3.png",

        link:
            "ihub.html"
    },


    {
        title:
            "MakerDrop",

        category:
            "UX Design · Product Design · Design Thinking",

        description:
            "Design Thinking research project aiming to increase the discoverability and accessibility of the UTM Makerspace.",

        placeholder:
            "MakerDrop preview",

        image:
            "Assets/projects/workpreview2.png",

        link:
            "makerdrop.html"
    },


    {
        title:
            "Campus Calm",

        category:
            "UI/UX · Front-End Web Development · Interactive Media Design",

        description:
            "A student-wellness interface offering quick, low-pressure mental health support through interactive digital activities.",

        placeholder:
            "Campus Calm preview",

        image:
            "Assets/projects/workpreview1.png",

        link:
            "campuscalm.html"
    }

];



/* ========================================
   PROJECT CAROUSEL STATE
   ======================================== */

let currentProject = 0;



/* ========================================
   PROJECT ELEMENTS
   ======================================== */

const projectTitle =
    document.querySelector("#project-title");


const projectCategory =
    document.querySelector("#project-category");


const projectDescription =
    document.querySelector("#project-description");


const projectScreenLink =
    document.querySelector("#project-screen-link");


const projectScreenImage =
    document.querySelector("#project-screen-image");


const projectPlaceholder =
    document.querySelector("#project-screen-placeholder");


const previousProjectButton =
    document.querySelector(".previous-project");


const nextProjectButton =
    document.querySelector(".next-project");


const projectDots =
    document.querySelectorAll(
        ".carousel-dots .dot"
    );



/* ========================================
   SHOW PROJECT
   ======================================== */

function showProject(index) {

    currentProject = index;


    const project =
        projects[currentProject];



    /* ----------------------------
       Update text
       ---------------------------- */

    projectTitle.textContent =
        project.title;


    projectCategory.textContent =
        project.category;


    projectDescription.textContent =
        project.description;



    /* ----------------------------
       Update project link
       ---------------------------- */

    projectScreenLink.href =
        project.link;


    projectScreenLink.setAttribute(
        "aria-label",
        `View ${project.title} project`
    );



    /* ----------------------------
       Update preview
       ---------------------------- */

    if (project.image) {

        projectScreenImage.src =
            project.image;


        projectScreenImage.alt =
            `${project.title} project preview`;


        projectScreenImage.style.display =
            "block";


        projectPlaceholder.style.display =
            "none";

    }

    else {

        projectScreenImage.style.display =
            "none";


        projectPlaceholder.style.display =
            "flex";


        projectPlaceholder.textContent =
            project.placeholder;

    }



    /* ----------------------------
       Update dots
       ---------------------------- */

    projectDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentProject
            );

        }
    );

}



/* ========================================
   NEXT PROJECT
   ======================================== */

nextProjectButton.addEventListener(
    "click",
    () => {

        const nextIndex =
            (currentProject + 1)
            % projects.length;


        showProject(nextIndex);

    }
);



/* ========================================
   PREVIOUS PROJECT
   ======================================== */

previousProjectButton.addEventListener(
    "click",
    () => {

        const previousIndex =
            (
                currentProject
                - 1
                + projects.length
            )
            % projects.length;


        showProject(previousIndex);

    }
);



/* ========================================
   DOT NAVIGATION
   ======================================== */

projectDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showProject(index);

            }
        );

    }
);



/* ========================================
   LOAD FIRST PROJECT
   ======================================== */

showProject(0);


/* ========================================
   DIGICAM INTERACTION
   ======================================== */

const cameraButton =
    document.querySelector("#cameraButton");

const cameraStage =
    document.querySelector("#cameraStage");

const cameraImage =
    document.querySelector("#cameraImage");


const cameraImages = [
    "Assets/cam1.png",
    "Assets/cam2.png",
    "Assets/cam3.png"
];


let currentCameraImage = 0;

let cameraIsAnimating = false;


/* Preload images */

cameraImages.forEach((src) => {

    const image = new Image();

    image.src = src;

});


if (
    cameraButton &&
    cameraStage &&
    cameraImage
) {

    cameraButton.addEventListener(
        "click",
        () => {

            /*
                Prevent rapid clicking while
                the flash is happening.
            */

            if (cameraIsAnimating) {
                return;
            }


            cameraIsAnimating = true;


            /* Start flash */

            cameraStage.classList.add(
                "is-flashing"
            );


            /*
                Change image while the
                flash is covering the camera.
            */

            setTimeout(() => {

                currentCameraImage =
                    (
                        currentCameraImage + 1
                    ) % cameraImages.length;


                cameraImage.src =
                    cameraImages[
                        currentCameraImage
                    ];

            }, 100);


            /* End flash */

            setTimeout(() => {

                cameraStage.classList.remove(
                    "is-flashing"
                );


                cameraIsAnimating = false;

            }, 330);

        }
    );

}