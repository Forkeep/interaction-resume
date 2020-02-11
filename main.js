const css1 = `
#wrapper {
  position: relative;
  background-color: #add8e6;
  height: 100vh;
  width: 100%;
}
#wrapper #code {
  position: relative;
  width: 45%;
  height: 90vh;
  margin-left: 30px;
  top: 50%;
  transform: translateY(-50%);
}
#wrapper #code .computer .monitor {
  position: absolute;
  background-color: white;
  width: 94%;
  height: 92%;
  margin: auto auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#wrapper #code .computer .monitor .inner-monitor {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  width: 99%;
  height: 99%;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
/*准备好我的电脑！*/
#wrapper #code .computer {
  background-color: #333333;
  border-radius: 8px;
  width: 90%;
  height: 45%;
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-70%);
}
#wrapper #code .computer::before {
  content: "";
  width: 30%;
  height: 15%;
  background-color: #222222;
  position: absolute;
  margin: 1px auto;
  left: 0;
  right: 0;
  top: 100%;
}
#wrapper #code .computer::after {
  position: absolute;
  content: "";
  width: 58%;
  height: 8%;
  margin: 50px auto 0 auto;
  left: 0;
  right: 0;
  top: 100%;
  background-color: #222222;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/*准备好一张纸来当做简历~*/
#wrapper #resume {
  background-color: white;
  position: absolute;
  border-radius: 10px;
  width: 45%;
  height: 90vh;
  margin: auto 30px;
  top: 0;
  bottom: 0;
  right: 0;
  border: 1px solid #369fa1;
  animation-name: breathe;
  animation-delay: 0s;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}

#wrapper #resume #resumePre{
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  width: 99%;
  height: 99%;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

}

/* 现在开始准备介绍我自己了 */

`;

const css2 = `
/*现在把markdown格式转化成好看的HTML格式吧~*/

`;

const css3 = `
/* 这就是我啦！*/
`;
const md = `
# 自我介绍

我叫 李哲

1997 年 1 月出生

本科北京科技大学毕业

现研究生在读

刚开始自学前端

希望以后可以从事前端开发工程师

# 技能介绍

较为熟悉HTML，CSS，JS

正在学习TS，JQuery，Vue

# 项目介绍

1. 动态简历
2. 画了皮卡丘
3. 画了太极图
4. 个人导航界面

# 我喜欢的

- 我的女朋友
- 健身
- 前端
- 摄影

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx


`;

//step1: css layout
//step2: markdown
//step3: css m2html
//step4: css complete

let speedCss = 20;
let speedMarkdown = 30;
//
// function speedControl(){
//     speedone.onclick = function () {
//         console.log('1')
//         speedCss = 200;
//         speedMarkdown = 300;
//     };
//     speedtwo.onclick = function () {
//         console.log('2')
//         speedCss = 10;
//         speedMarkdown = 15;
//     };
//
//     speedthree.onclick = function () {
//         console.log('3')
//         speedCss = 5;
//         speedMarkdown = 7;
//     };
// }



function writeCss(pre, code, fn) {
    let codeNode = document.getElementById('innerMonitor');
    let styleNode = document.getElementById('cssStyle');
    let n = 0;
    let id = setInterval(() => {
        n = n + 1;
        codeNode.innerHTML = Prism.highlight(pre + code.substring(0, n), Prism.languages.css);
        styleNode.innerHTML = pre + code.substring(0, n);
        //不断往下移动
        codeNode.scrollTop = codeNode.scrollHeight;
        if (n >= code.length) {
            window.clearInterval(id);
            fn && fn.call();
        }
    }, speedCss);

}

function writeMarkdown(markdown, fn) {
    let markdownNode = document.getElementById('resumePre');
    let n = 0;

    let id = setInterval(() => {

        n = n + 1;
        markdownNode.innerHTML = markdown.substring(0, n);
        markdownNode.scrollTop = markdownNode.scrollHeight;

        if (n >= markdown.length) {
            window.clearInterval(id);
            fn && fn.call();
        }
    }, speedMarkdown);
}

function convert(fn) {
    let div = document.createElement('div');
    div.id = 'resumePre';
    div.className = 'html markdown-body';
    div.innerHTML = marked(md);
    let resume = document.getElementById('resumePre');
    resume.replaceWith(div);
    fn && fn.call()
}


writeCss('', css1, () => {
    writeMarkdown(md, () => {
        writeCss(css1, css2, () => {
            convert(() => {
                writeCss(css1 + css2, css3, () => {
                    console.log('ok!')
                })
            })
        })
    })
});























