# Centos服务器配置
## 必装软件
- nethogs   `网速监控`
- screen    `后台运行`
- lrzsz     `上传下载`
- htop      `进程管理`

---

## 更改系统编码为中文
1. vim /etc/profile
2. 在文件最后加上
``` shell
export LC_ALL="zh_CN.UTF-8"  
export LANG="zh_CN.UTF-8"
```
3. source /etc/profile 立即生效
4. echo $LANG 显示默认编码

---

## 安装gcc,g++
```
yum  install python34-devel
yum  install python-devel
```

---

## 安装python3.4和pip3.4
1. 添加epel源
```
    yum install epel-release
```
2. 安装Python3.4
```
    yum install python34
```
3. 安装pip3
```
    yum install python34-setuptools
    easy_install-3.4 -i https://pypi.tuna.tsinghua.edu.cn/simple pip
```
4. 之后就可以使用pip3了,例如：
```
    pip3 install requests
```
5. pip还源加速  
Linux下，修改 ~/.pip/pip.conf (没有就创建一个)， 修改内容如下：
``` shell
    [global]  
    index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```
---

## 安装mono
```
rpm --import "http://keyserver.ubuntu.com/pks/lookup?op=get&search=0x3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF"    
yum-config-manager --add-repo http://download.mono-project.com/repo/centos/  （yum -y install yum-utils）
yum -y install mono-complete
```

---

## 安装jdk
1. 安装
```
    rpm -ivh jdk.rpm
```
2. 环境变量
```
vim /etc/profile
```
    加入内容如下：
```
  export JAVA_HOME=/usr/local/jdk1.8.0_131
  CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
  export PATH=$JAVA_HOME/bin:$PATH
  source /etc/profile
```