<template>
    <NavBar/>
  <div class="flex-box">
    <canvas ref="canvas" class="canvas"></canvas>
    <div class="container__tools"> 
   
      <button @click="addComment">
        <font-awesome-icon icon="fa-regular fa-comment" />
      </button>
        <button class="piscar" @click="addEditableText">
            <span class="material-symbols-outlined">format_shapes</span>
        </button>
      <button @click="draw">
        <font-awesome-icon icon="fa-solid fa-pencil" />
      </button>
      <input type="color" v-model="selectedColor" />

        <div>
        <button @click="showSubButtons = !showSubButtons" >Abrir aba</button>
        <div v-if="showSubButtons" class="aba">
            <div class="tools1">
       <button @click="addSquare">
                <font-awesome-icon icon="fa-regular fa-square" />
              </button>
              <button @click="addCircle">
                <font-awesome-icon icon="fa-regular fa-circle" />
              </button>
              <button @click="addHexagon">
                <span class="material-symbols-outlined">hexagon</span>

              </button>
            </div>

       <div class="tools">
       <button @click="addTriangle">
                <span class="material-symbols-outlined">change_history</span>
              </button>
              <button @click="addArrow">
                <font-awesome-icon icon="fa-solid fa-arrow-right" />
              </button>
       </div>
       
        </div>
      </div>
      
      <input type="range" min="1" max="50" v-model="lineWidth" />
      <button @click="erase">
        <span class="material-symbols-outlined">format_ink_highlighter</span>
      </button>
      <button @click="clearCanvas">
        <font-awesome-icon icon="fa-solid fa-broom" />
      </button>
      <button @click="saveCanvas">
        <font-awesome-icon icon="fa-solid fa-download" />
      </button>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { saveAs } from "file-saver";
import NavBar from "../Navbar/NavBarP.vue";
export default {
    mounted() {
        this.canvas = new fabric.Canvas(this.$refs.canvas);
        this.canvas.on("text:editing:entered", (options) => {
            this.editableText = options.target;
        });
        this.canvas.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        /**Implementacao do background Canvas */
        var canvasBackground = document.querySelector("canvas");
        const context = canvasBackground.getContext("2d");
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvasBackground.width, canvasBackground.height);
        const ctx = canvasBackground.getContext("2d");
        ctx.strokeStyle = "#000"; // cor da linha
        ctx.lineWidth = 0.1; // espessura da linha
        const step = 90; // espaço entre cada linha horizontal
        for (let y = 0; y < canvasBackground.height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasBackground.width, y);
            ctx.stroke();
        }
        const steptwo = 90; // espaço entre cada linha vertical
        for (let x = 0; x < canvasBackground.width; x += steptwo) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasBackground.height);
            ctx.stroke();
        }
        this.comment = {
            text: "",
            color: "black",
            fontSize: 20,
            left: 0,
            top: 0,
        };
    },
    // Adicionando novas Funcionalidades
    data() {
        return {
            selectedColor: "#000000",
            inputText: "",
            lineWidth: 5,
            tamanhoFonte: 10,
            selectedFont: "Arial",
            editableText: null,
            drawing: false,
            linha: null,
            showSubButtons: false,
             isDrawing: false,
            hexagon: null,
            hexX: 0,
            hexY: 0,
            hexRadius: 0
        };
    },
    methods: {
        addSquare() {
                 this.showSubButtons =false,
            this.drawingCircle = false;
            // Defina a variável de desenho como verdadeira
            this.drawing = true;
            this.canvas.isDrawingMode = false;
            // Adicione um evento de clique no canvas
            this.canvas.on("mouse:down", (event) => {
                if (this.drawing) {
                    // Crie um novo quadrado Fabric.js
                    this.quadrado = new fabric.Rect({
                        left: event.e.offsetX,
                        top: event.e.offsetY,
                        width: 0,
                        height: 0,
                        fill: "transparent",
                        stroke: this.selectedColor,
                        strokeWidth: 2,
                        selectable: true,
                    });
                    // Adicione o quadrado ao canvas
                    this.canvas.add(this.quadrado);
                    // Adicione um evento de movimento do mouse no canvas
                    this.canvas.on("mouse:move", (event) => {
                        // Calcule as dimensões do quadrado com base na posição do mouse atual e sua posição inicial
                        let width = event.e.offsetX - this.quadrado.left;
                        let height = event.e.offsetY - this.quadrado.top;
                        // Atualize as dimensões do quadrado
                        this.quadrado.set({ width: width, height: height });
                        this.quadrado.setCoords();
                        // Renderize o canvas novamente
                        this.canvas.renderAll();
                    });
                    this.quadrado.on("mousedown", () => {
                        this.drawing = false;
                    });
                    // Adicione um evento de liberação do mouse no canvas
                    this.canvas.on("mouse:up", () => {
                        // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
                        this.drawing = false;
                        this.canvas.off("mouse:move");
                        this.canvas.off("mouse:up");
                    });
                    // Desative a criação de círculos
                    this.drawingCircle = false;
                    this.canvas.off("mouse:down");
                }
            });
        },
        addCircle() {
                 this.showSubButtons = false,
            this.drawing = true;
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
            this.canvas.isDrawingMode = false;
            // Adicione um evento de clique no canvas
            this.canvas.on("mouse:down", (event) => {
                if (this.drawing) {
                    // Crie um novo círculo Fabric.js
                    this.circulo = new fabric.Circle({
                        left: event.e.offsetX,
                        top: event.e.offsetY,
                        radius: 0,
                        fill: "transparent",
                        stroke: this.selectedColor,
                        strokeWidth: 2,
                        selectable: true,
                    });
                    // Adicione o círculo ao canvas
                    this.canvas.add(this.circulo);
                    // Adicione um evento de movimento do mouse no canvas
                    this.canvas.on("mouse:move", (event) => {
                        // Calcule o raio do círculo com base na posição do mouse atual e sua posição inicial
                        let dx = event.e.offsetX - this.circulo.left;
                        let dy = event.e.offsetY - this.circulo.top;
                        let radius = Math.sqrt(dx * dx + dy * dy);
                        // Atualize o raio do círculo
                        this.circulo.set({ radius: radius });
                        this.circulo.setCoords();
                        // Renderize o canvas novamente
                        this.canvas.renderAll();
                    });
                    // Adicione um evento de liberação do mouse no canvas
                    this.canvas.on("mouse:up", () => {
                        // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
                        this.drawing = false;
                        this.canvas.off("mouse:move");
                        this.canvas.off("mouse:up");
                    });
                    // Adicione um evento de clique no círculo
                    this.circulo.on("mousedown", () => {
                        // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
                        this.drawing = false;
                        this.canvas.off("mouse:move");
                        this.canvas.off("mouse:up");
                    });
                    this.canvas.on("selection:created", (event) => {
                        // Se o objeto selecionado for diferente do círculo, desative o desenho do círculo
                        if (event.target !== this.circle) {
                            this.drawingCircle = false;
                        }
                    });
                    this.canvas.off("mouse:down");
                }
            });
        },
        addTriangle() {

             this.showSubButtons = false,
            this.drawingTriangle = true;
            this.drawingSquare = false;
            this.drawingCircle = false;
            // Limpe a seleção atual no canvas
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
            // Adicione um evento de clique no canvas
            this.canvas.on("mouse:down", (event) => {
                if (this.drawingTriangle) {
                    // Crie um novo triângulo Fabric.js
                    this.triangle = new fabric.Triangle({
                        left: event.e.offsetX,
                        top: event.e.offsetY,
                        width: 0,
                        height: 0,
                        fill: "transparent",
                        stroke: this.selectedColor,
                        strokeWidth: 2,
                        selectable: true,
                    });
                    // Adicione o triângulo ao canvas
                    this.canvas.add(this.triangle);
                    // Adicione um evento de movimento do mouse no canvas
                    this.canvas.on("mouse:move", (event) => {
                        // Calcule as dimensões do triângulo com base na posição do mouse atual e sua posição inicial
                        let width = event.e.offsetX - this.triangle.left;
                        let height = event.e.offsetY - this.triangle.top;
                        // Atualize as dimensões do triângulo
                        this.triangle.set({ width: width, height: height });
                        this.triangle.setCoords();
                        // Renderize o canvas novamente
                        this.canvas.renderAll();
                    });
                    // Adicione um evento de liberação do mouse no canvas
                    this.canvas.on("mouse:up", () => {
                        // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
                        this.drawingTriangle = false;
                        this.canvas.off("mouse:move");
                        this.canvas.off("mouse:up");
                    });
                }
            });
        },
        addHexagon() {
                  this.showSubButtons = false,
            // Defina a variável de desenho como verdadeira
            this.drawingHexagon = true;
            // Limpe a seleção atual no canvas
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
            // Adicione um evento de clique no canvas
            this.canvas.on("mouse:down", (event) => {
                if (this.drawingHexagon) {
                    // Crie um novo hexágono Fabric.js
                    this.hexagon = new fabric.Polygon([
                        { x: 100, y: 0 },
                        { x: 200, y: 0 },
                        { x: 250, y: 100 },
                        { x: 200, y: 200 },
                        { x: 100, y: 200 },
                        { x: 50, y: 100 },
                    ], {
                        left: event.e.offsetX,
                        top: event.e.offsetY,
                        fill: "transparent",
                        stroke: this.selectedColor,
                        strokeWidth: 2,
                        selectable: true,
                    });
                    // Adicione o hexágono ao canvas
                    this.canvas.add(this.hexagon);
                    // Adicione um evento de movimento do mouse no canvas
                    this.canvas.on("mouse:move", (event) => {
                        // Mova o hexágono com o mouse
                        this.hexagon.set({ left: event.e.offsetX, top: event.e.offsetY });
                        this.hexagon.setCoords();
                        // Renderize o canvas novamente
                        this.canvas.renderAll();
                    });
                    // Adicione um evento de liberação do mouse no canvas
                    this.canvas.on("mouse:up", () => {
                        // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
                        this.drawingHexagon = false;
                        this.canvas.off("mouse:move");
                        this.canvas.off("mouse:down");
                    });
                }
            });
        },
        addArrow() {
                this.showSubButtons = false,
            this.drawingArrow = true;
            // Limpe a seleção atual no canvas
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
            // Adicione um evento de clique no canvas
            this.canvas.on("mouse:down", (event) => {
                if (this.drawingArrow) {
                    // Crie um novo objeto Fabric.js do tipo Path
                    this.arrow = new fabric.Path("M 0 0 L 20 10 L 0 20 L 10 10 z", {
                        left: event.e.offsetX,
                        top: event.e.offsetY,
                        fill: "transparent",
                        stroke: this.selectedColor,
                        strokeWidth: 2,
                        selectable: true,
                    });
                    // Adicione a seta ao canvas
                    this.canvas.add(this.arrow);
                    // Adicione um evento de movimento do mouse no canvas
                    this.canvas.on("mouse:move", (event) => {
                        // Calcule a posição do final da seta com base na posição do mouse atual e sua posição inicial
                        let dx = event.e.offsetX - this.arrow.left;
                        let dy = event.e.offsetY - this.arrow.top;
                        let angle = Math.atan2(dy, dx);
                        let length = Math.sqrt(dx * dx + dy * dy);
                        let x2 = this.arrow.left + length * Math.cos(angle);
                        let y2 = this.arrow.top + length * Math.sin(angle);
                        // Atualize o caminho da seta
                        this.arrow.set({
                            path: `M 0 0 L ${length} 0 L ${length} ${this.arrow.strokeWidth} L 0 ${this.arrow.strokeWidth} z`,
                            angle: (angle * 180) / Math.PI,
                            top: y2,
                            left: x2,
                        });
                        this.arrow.setCoords();
                        // Renderize o canvas novamente
                        this.canvas.renderAll();
                    });
                    // Adicione um evento de liberação do mouse no canvas
                    this.canvas.on("mouse:up", () => {
                        // Defina a variável de desenho como falsa e remova os eventos de movimento e liberação do mouse
                        this.drawingArrow = false;
                        this.canvas.off("mouse:move");
                        this.canvas.off("mouse:up");
                    });
                }
            });
        },
        clearCanvas() {
                this.showSubButtons = false,
            // Limpa o canvas
            this.canvas.clear();
            // Remove todos os eventos de mouse do canvas
            this.canvas.off("mouse:down");
            this.canvas.off("mouse:move");
            this.canvas.off("mouse:up");
            this.canvas.off("object:moving");
        },
        erase() {
         
        },
        draw() {
            const patternBrush = new fabric.PencilBrush(this.canvas);
            patternBrush.getPatternSrc = function () {
                var patternCanvas = fabric.document.createElement("canvas");
           
                var ctx = patternCanvas.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(10, 5);
                ctx.closePath();
                ctx.stroke();
                return patternCanvas;
            };
            patternBrush.color = this.selectedColor;
            patternBrush.width = this.lineWidth;
            this.canvas.freeDrawingBrush = patternBrush;
            this.canvas.isDrawingMode = true;
        },
        addEditableText() {
            const editableText = new fabric.IText("Digite aqui...", {
                left: 50,
                top: 50,
                fill: "black",
                fontSize: 20,
                font: this.tamanhoFonte,
                fontFamily: this.selectedFont,
            });
            document.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    this.canvas.discardActiveObject();
                    this.editableText = null;
                }
            });
            this.canvas.add(editableText);
            this.editableText = editableText;
        },
        addComment() {
            // Crie um novo comentário Fabric.js
            const comment = new fabric.IText("", {
                left: 100,
                top: 100,
                fill: this.comment.color,
                fontSize: this.comment.fontSize,
            });
            // Adicione o comentário ao canvas
            this.canvas.add(comment);
            // Selecione o comentário e ative a edição de texto
            comment.setCoords();
            this.canvas.setActiveObject(comment);
            comment.enterEditing();
            // Salve o comentário no objeto de comentário atual
            this.comment.text = comment.text;
            this.comment.left = comment.left;
            this.comment.top = comment.top;
        },
      
        saveState() {
            this.undoStack.push(this.canvas.toJSON());
            this.redoStack = [];
        },
        saveCanvas() {
            const dataUrl = this.canvas.toDataURL("image/png");
            const blob = this.dataURItoBlob(dataUrl);
            saveAs(blob, "canvas.png");
        },
        dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(",")[1]);
            const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        },
    },
    components: { NavBar }
};
</script>




<style scoped>
button {
  background: none;
  border: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.canvas {
  align-items: center;
  background: linear-gradient(to bottom, #f4f4f4, #fff);
}

.container__tools {


    width: 45rem;
    height: 4rem;
  gap: 1.2rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(252, 234, 206);
  border-radius: 10px;
  background: rgb(255, 255, 255);

  position: fixed;
    bottom: 1rem;

 box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.348);

}

.canvas {
  background-image: linear-gradient(1.5px, transparent 1.5px, transparent calc(100% - 1.5px), #1c7cbb calc(100% - 1.5px)), linear-gradient(90deg, #1c7cbb 1.5px, transparent 1.5px, transparent calc(100% - 1.5px), #1c7cbb calc(100% - 1.5px));
  background-size: 1% 1%;

} 

/* Icons */
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 10,
  'opsz' 10
}

.aba{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 10rem;
    height: 6rem;
    position: absolute;
    background: #fff;
    top: -6rem;
 box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.348);

}

.tools1{
    display: flex;
    align-items: center;
    gap: 2rem;
}
</style>