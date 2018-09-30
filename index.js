/*
* 上一页 下一页 2个: 2
* 首页  尾页 2个: 2
* 省略号2个: 2
* 当前页1个: 1
* 当前页左右各2个: 2*2
*
* baseCount: 关键变量
* */

/*
* 分页组件一共是由2+2+2+1+2*2=11个元素构成的。
* 三个参数
* around: 当前页周边的元素。
* cur: 当前元素
* total: 总的元素
* */


/*
* baseCount = 2+2+2+1+2*around
* 关键：可以使用这个值来判断分页组件什么时候出现省略号。除掉两边的上一页、下一页两个按钮，中间部分一共有11-2=9个元素，也就是说当分页的总数total <= 9(baseCount - 2)的时候，是不需要省略号的，位置够用。
*
* */

/*
* 省略号的作用
* 省略号的作用就是最少代表2个元素。
* 省略号出现的位置，一般有三种情况。
* 1、只出现在后面
* 2、只出现在前面
* 3、两边都出现
*
* 》 出现省略号的前提条件是total > baseCount - 2
*
* a: 只出现在后面的情况，首先确定什么时候前面刚好出现省略号？根据刚刚得出的省略号的作用，也就是说它最少代替两个元素。所以取这个最小值2，此时省略号代表的越多则说明curl越往后。
*
* 这个时候cur的位置应该是在：首页(1) + 省略号最小值(2) + cur 左边的值around(2)的下一个，即cur = 1 + 2 + around + 1,标记一下叫startPosition。因此当cur < startPosition时前面是不会出现省略号的，仅在后面出现省略号，所以就确定了省略号开始出现时的位置： startPosition = 1 + 2 + around + 1;
*
* b: 同样的逻辑，我们还可以得出只在前面出现，后面不会出现省略号的一个临界位置： endPosition = 尾页(total) - 省略号最小值(2) - cur右边的值(2) - 1。即cur > endPosition时只在前面出现省略号
*
* c: 当startPosition <= cur && cur <= endPosition
*
*
* 其他的位置怎么显示
* 暂时不管上一页和下一页。baseCount是11。只看中间实际用到的9个位置。
*
* 我们可以看到当省略号只出现在后面时，可用位置的最后两个一定是...和total。所以这个省略号前面的还剩下9-2 = 7个，给这个变量也取个名字叫surplus,就从1开始显示到surplus就好了。也是同样的道理，当省略号只出现在前面时，前面的两个位置一定是1和...。所以后面就是从(total-surplus)一直到total了
*
* 还有就是两边都出现省略号，前面两个肯定是1和...。后面两个又肯定是...和total。那么中间的就是cur以及其左右两边的相邻的around个。
* 当有省略号出现时，这种逻辑保证了分页组件总共需要的元素的个数是固定的，且只跟around有关，around取值建议为2或者3。
* */

const makePage = (total, cur, around) => {
        let result = [];
        let baseCount = around * 2 + 1 + 2 + 2 + 2;// 总共元素个数
        let surplus = baseCount - 4; // 只出现一个省略号，剩余元素的个数
        let startPosition = 1 + 2 + around + 1; // 前面出现省略号的临界点
        let endPosition = total - 2 - around - 1; // 后面出现省略号的临界点

        if (total <= baseCount - 2) { // 全部显示 不出现省略号
                result  = Array.from({length: total}, (v,i)=> i + 1);

        }else { // 出现省略号
                if(cur < startPosition) { // 只有后面出现省略号
                        result = [...Array.from({length: surplus}, (v, i) => i + 1), '...', total]
                }else if(cur > endPosition) { // 只有前边出现省略号
                        result = [1, '...', ...Array.from({length: surplus}, (v, i) => total - surplus + i + 1)]
                }else { // 两边都有省略号
                        result = [1, '...', ...Array.from({length: around*2 +1}, (v, i) => cur - around + i), '...', total]
                }
        }
        console.log(result);
        return result;
    }
;

makePage(8, 2, 2);
makePage(20, 3, 2);
makePage(20, 10, 2);
makePage(20, 19, 2);
