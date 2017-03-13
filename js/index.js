$(function(){
			// 搜索
			(function(){

				var aLi = $('#menu li');
				var arrText = [
					'例如：荷棠鱼坊烤鱼或樱花日本料理',
					'例如：昌平区育新站龙旗广场2号楼609室',
					'例如：万达影院双人情侣卷',
					'例如：东莞出事了，打老虎是谁？',
					'例如：背景初春降雪，天气变换莫测'
				];
				var iNow = 0;
				var oText = $('#search').find('.form .text');
				oText.val(arrText[iNow]);

				aLi.each(function(index){
					$(this).click(function(){
						iNow = index;
						aLi.attr('class','gradient');
						$(this).attr('class','active');
						oText.val(arrText[iNow]);
					})

					oText.focus(function(){
						if($(this).val()==arrText[iNow] ){
							$(this).val('');
						}
					});
					oText.blur(function(){
						if($(this).val() == ''){
							$(this).val(arrText[iNow]);
						}
					})
				});
			})();

			// 文字滚动
			(function(){
				var oDiv = $('#update');
				var oUl = $('#update ul');
				
				var iNow = 0;
				var arrDate = [
					{'name':'萱萱','time':5,'title':'那些灿烂华美的瞬间','url':'http://www.timetimetime.net/yulu/11431.html'},
					{'name':'畅畅','time':7,'title':'《冰雪大作战》许魏洲将演唱中文主题曲','url':'http://ent.firefox.sina.com/17/0301/20/T9C8S3DRP2M5IBUW.html'},
					{'name':'琪琪','time':12,'title':'既然已经分开，就不要再走这条回头路了','url':'http://eladies.sina.com.cn/feel/koushu/2017-01-06/0958/doc-ifxxnety7251696.shtml'},
					{'name':'萱萱','time':5,'title':'那些灿烂华美的瞬间','url':'http://www.timetimetime.net/yulu/11431.html'},
					{'name':'畅畅','time':7,'title':'《冰雪大作战》许魏洲将演唱中文主题曲','url':'http://ent.firefox.sina.com/17/0301/20/T9C8S3DRP2M5IBUW.html'},
					{'name':'琪琪','time':12,'title':'既然已经分开，就不要再走这条回头路了','url':'http://eladies.sina.com.cn/feel/koushu/2017-01-06/0958/doc-ifxxnety7251696.shtml'}
				];
				var timer =null;
				var str = '';
				for( var i=0; i<arrDate.length; i++){
					str += '<li><a href="'+ arrDate[i].url +'" target="_blank"><strong>'+ arrDate[i].name +'</strong> <span>'+ arrDate[i].time +'分钟前</span> 写了一篇新文章：'+ arrDate[i].title +'...</a></li>';
				}

				oUl.html(str);
				var aLi = $('#update li');
				aLi.eq(0).clone().appendTo(oUl);		
				var iH = oUl.find('li').height();
				$('#UpBtn').click(function(){
					if(oUl.height() == oUl.height()-iH){
						oUl.css('top',0);
					}
					doMove(-1);	
				})
				$('#DownBtn').click(function(){
					doMove(1);
					
				})

				oDiv.hover(function(){clearInterval(timer);},autoPlay);

				function autoPlay(){
					timer = setInterval(function(){
						doMove(-1);
					},1500);
				}

				autoPlay();

				function doMove(num){
					iNow += num;
					
					if( Math.abs(iNow)> aLi.length){
						iNow = 0;
						oUl.css('top',0);
					}
					if( iNow > 0){
						iNow = -(aLi.length-1);
					}
					oUl.stop().animate({'top':iH*iNow},1500,'elasticOut');
				}
			})();

			//options 切换
			(function(){
				tabFn($('.tabNav1'),$('.tabCon1'));
				tabFn($('.tabNav2'),$('.tabCon2'));
				tabFn($('.tabNav3'),$('.tabCon3'));
				tabFn($('.tabNav4'),$('.tabCon4'));
				function tabFn(oNav,oCon){
					var aElem = oNav.children();
					oCon.hide().eq(0).show();
					aElem.each(function(index){
						$(this).click(function(){
							aElem.removeClass('active').addClass('gradient');
							$(this).removeClass('gradient').addClass('active');
							aElem.find('a').attr('class','triangle_down_gray');
							$(this).find('a').attr('class','triangle_down_red');
							oCon.fadeOut(200).eq(index).fadeIn(500);
						})
					})
				}
			})();

			//精彩推荐焦点图 切换
			(function(){
				var oDiv = $('#pic');
				var aUlImg = oDiv.find('ul li');	
				var aOlImg = oDiv.find('ol li');
				var oP = oDiv.find('p');
				var arrText = ['爸爸去哪儿','人像摄影中的光影感','娇艳妩媚，美艳大方'];
				var iNow =0;
				var timer = null;
				aOlImg.eq(0).css('z-index','3');

				aUlImg.each(function(index){
					$(this).click(function(){
						iNow = index;
						fnFade();
					})
				})

				function fnFade(){
					iNow %= aUlImg.length;
					aUlImg.removeClass('active_border');
					aUlImg.eq(iNow).addClass('active_border');
					aOlImg.fadeOut(500).eq(iNow).fadeIn(500);
					oP.html(arrText[iNow]);
				}
				fnFade();
				function autoPlay(){
					timer=setInterval(function(){
						iNow++;
						fnFade();
					},2000);
				}
				autoPlay();
				oDiv.hover(function(){clearInterval(timer);},autoPlay);
			})();

			//日历提示说明
			(function(){
				var aSpan = $('.calendar h3 span');
				var aImg = $('.calendar .img');
				var oPrompt = $('.tody_info');
				var oImg = oPrompt.find('img');
				var oEm = oPrompt.find('em');
				var oP = oPrompt.find('p');

				aImg.hover(function(){
					var iTop = ($(this).parent().position().top+$(this).height()/2) - oPrompt.innerHeight()/2;
					var iLeft = $(this).parent().position().left + $(this).width()+20;
					oEm.html( aSpan.eq( $(this).parent().index()%aSpan.size() ).html() );
					oImg.attr('src',$(this).attr('src'));
					oP.text($(this).attr('info'));
					oPrompt.show().css({'top':iTop,'left':iLeft});
				},function(){
					oPrompt.hide();
				});
			})();

			//BBS高亮显示
			(function(){
				var aLi = $('.bbs ol li');
				aLi.mouseover(function(){
					aLi.removeClass('active').eq($(this).index()).addClass('active');
				})
			})();

			//红人烧客
			(function(){
				var aLi = $('.hot_area li');
				var arr = [
					'',
					'用户1<br />人气1645',
					'用户名：性感宝贝<br />区域：朝阳CBD<br/>人气：124987',
					'用户3<br/>人气787',
					'用户4<br/>人气67224',
					'用户5<br/>人气1224',
					'用户6<br/>人气78454',
					'用户7<br/>人气45125',
					'用户8<br/>人气4785',
					'用户9<br/>人气2547',
					'用户10<br/>人气44545'
				];
				aLi.mouseover(function(){
					if($(this).index() == 0) return;
					aLi.find('div').remove();
					$(this).append('<div style="width: '+($(this).width()-12)+'px; height: '+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</div>');
				})
			})();
		})