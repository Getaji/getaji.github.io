new Vue({
  el: '#app',
  data: {
    canvasWidth: 0,
    canvasHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
    magnification: 1,
    isShowBgColor: true,
    bgColor: '#000000',
    image: new Image(),
    isLoadedImage: false,
    inputImageUrl: '',
  },
  computed: {
    validateSubmitUrlInput() {
      return this.inputImageUrl.length > 0;
    },
    canvasStyle() {
      return {
        width: this.canvasWidth + 'px',
        height: this.canvasHeight + 'px'
      };
    }
  },
  mounted() {
    this.offCanvasSmoothing();
  },
  methods: {
    getCanvasContext() {
      return this.$refs.canvas.getContext('2d');
    },
    offCanvasSmoothing(ctx) {
      if (!ctx) {
        ctx = this.getCanvasContext();
      }
      ctx.msImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
    },
    drawImage(width, height) {
      if (width === undefined) width = this.canvasWidth;
      if (height === undefined) height = this.canvasHeight;
      const ctx = this.getCanvasContext();
      ctx.clearRect(0, 0, width, height);
      this.offCanvasSmoothing(ctx);
      if (this.isShowBgColor) {
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, width, height);
      }
      if (this.isLoadedImage) {
        ctx.drawImage(this.image, 0, 0, width, height);
      }
    },
    reflectMagnification() {
      this.canvasWidth = this.imageWidth * this.magnification;
      this.canvasHeight = this.imageHeight * this.magnification;
      this.$nextTick(() => {
        this.drawImage();
      });
    },
    setMagnification(m) {
      if (m < 1) {
        return;
      }
      this.magnification = m;
      this.reflectMagnification();
    },
    incrementSize() {
      this.setMagnification(this.magnification + 1);
    },
    decrementSize() {
      this.setMagnification(this.magnification - 1);
    },
    loadImage(url) {
      this.isLoadedImage = false;
      const img = this.image;
      img.onload = (ev) => {
        this.isLoadedImage = true;
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.imageWidth = width;
        this.imageHeight = height;
        this.magnification = 1;
        this.$nextTick(() => {
          this.drawImage();
        });
      };
      img.src = url;
    },
    changeFileInput(ev) {
      console.log(ev);
      const files = ev.target.files;
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = (fileEv) => {
          this.loadImage(fileEv.target.result);
        };
        fileReader.readAsDataURL(files[0]);
      }
    },
    submitUrlInput(ev) {
      const url = this.inputImageUrl;
      if (url) {
        this.loadImage(url);
      }
    },
    onClickCanvas(ev) {
      const x = ev.offsetX;
      const y = ev.offsetY;
      const data = this.getCanvasContext().getImageData(x, y, 1, 1).data;
      const red = Number.parseInt(data[0]);
      const green = Number.parseInt(data[1]);
      const blue = Number.parseInt(data[2]);
      const rgb = `rgb(${red}, ${green}, ${blue})`;
      this.bgColor = rgb;
    }
  }
});
