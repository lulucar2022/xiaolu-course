<template>
    <footer>
        <div class="footer-main">
            <div class="footer-left">
                <img class="logo" src="@/assets/imgs/logo.png" />
                <img class="factory" src="@/assets/imgs/随手画2.png" />
            </div>
            <div class="footer-middle">
                <ul>
                    <li>关于我们</li>
                    <li>|</li>
                    <li>联系我们</li>
                    <li>|</li>
                    <li>意见反馈</li>
                    <li>|</li>
                    <li>版权声明</li>
                </ul>
                <div>备案-------------------------------------------------------------------</div>
            </div>
            <div class="footer-right">
                <ul>
                    <li>
                        <img src="@/assets/imgs/微信二维码.jpg" />
                        <span>微信</span>
                    </li>
                    <li>
                        <img src="@/assets/imgs/微信二维码.jpg" />
                        <span>指导微信</span>
                    </li>
                </ul>
            </div>
        </div>

    </footer>
</template>

<style scoped>
footer {

    width: 100%;
    height: 187px;
    background: #3483ff;
}

.footer-main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 187px;
    width: 1000px;
    margin: 0 auto;
}

.footer-left {
    display: flex;
    align-items: center;
}

footer .logo {
    width: 130px;
    height: 110px;
}

footer .factory {
    width: 130px;
    height: 110px;
}

.footer-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 31px;
    font-size: 12px;
    color: #fff;
}

.footer-middle ul {
    display: flex;
}


.footer-right ul {
    display: flex;
    color: #fff;
    font-size: 14px;
}

.footer-right ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer-right ul li+li {
    margin-left: 10px;
}

.footer-right img {
    width: 70px;
    height: 70px;
}

.footer-right span {
    margin-top: 10px;
}
</style>