<script setup>
import { ref } from 'vue'
const whatToExpect = [
	{
		src: 'for-comms.webp',
		title: 'For Comms',
		sub: 'Experience simplicity at its best – a powerful yet easy-to-use tool for better commmunication.',
	},
	{
		src: 'for-family.webp',
		title: 'For Family',
		sub: 'Build a sense of belonging by strong connections among your friends, family and team members',
	},
	{
		src: 'for-it.webp',
		title: 'For IT',
		sub: 'Improve your productivity with simple and centralized tool for streamlined communication.',
	},
	{
		src: 'for-employees.webp',
		title: 'For Employees',
		sub: 'Boost adoption rates with a platform that people actually enjoy using for effective communication.',
	},
]
const faqs = [
	{
		question: 'Can Workvivo integrate with the tools we already use?',
		answer:
			'Yes, Workvivo is designed to integrate seamlessly with a wide variety of tools your team may already use. This includes livestreaming platforms (like Zoom and Microsoft Teams), productivity suites (such as Atlassian’s Confluence & Jira), HR systems, single sign-on solutions, social channels, content management systems, video communications, document management systems, team collaboration tools like MS Teams and Slack, and more. Workvivo serves as a central hub for your digital workplace, streamlining communication and engagement within your organization.',
	},
	{
		question: 'Can Workvivo integrate with the tools we already use?',
		answer:
			'Yes, Workvivo is designed to integrate seamlessly with a wide variety of tools your team may already use. This includes livestreaming platforms (like Zoom and Microsoft Teams), productivity suites (such as Atlassian’s Confluence & Jira), HR systems, single sign-on solutions, social channels, content management systems, video communications, document management systems, team collaboration tools like MS Teams and Slack, and more. Workvivo serves as a central hub for your digital workplace, streamlining communication and engagement within your organization.',
	},
	{
		question: 'How does Workvivo handle security and data?',
		answer:
			'At Workvivo, we take security seriously, which is why we are proud to be ISO 27001 certified. This certification demonstrates our commitment to maintaining the highest highest level of security and protection. In addition to the ISO 27001 certification, we also generate an annual SOC 2 Type 2 report. This report provides independent assurance that our controls are designed and operating effectively to meet the Trust Services Criteria for security, availability, processing integrity, confidentiality, and privacy.',
	},
	{
		question: 'How does the pricing work?',
		answer:
			'We have different pricing plans and supercharged add-ons for you to choose from. The price of your platform will depend on how many licenses you require and your organization’s specific needs. Please request a custom quote here. ',
	},
]
const activeIndex = ref(-1)

const toggleAnswer = (index) => {
	activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<template>
	<div class="w-page z-page">
		<section class="land">
			<div class="container">
				<div class="col1">
					<h1>Speak up</h1>
					<p>
						An internal communication app that enables you to reach everyone, everywhere – in the
						office, at home or on the frontline.
					</p>
					<router-link :to="{ name: 'register' }" class="bbtn">Join us now</router-link>
				</div>
				<div class="photo">
					<img src="/static/welcome/chat-bro.png" alt="landing image" />
				</div>
			</div>
		</section>
		<section class="whatToExpect">
			<div class="container">
				<div class="tit">
					<h2 class="tito">What to Expect</h2>
				</div>
				<div class="features">
					<div v-for="f in whatToExpect" class="feature">
						<div class="photo">
							<img :src="`/static/welcome/${f.src}`" :alt="f.title" />
						</div>
						<div class="description">
							<h3>{{ f.title }}</h3>
							<p>{{ f.sub }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="contact">
			<div class="container">
				<div class="photo">
					<img src="/static/welcome/customer-support.webp" alt="cs" />
				</div>
				<div class="details">
					<h3>Hi, I'm Amy, your dedicated support agent!</h3>
					<p>
						Welcome to our platform! If you have any questions or need assistance, feel free to
						reach out. I'm here to guide you through any queries you may have. Let's make your
						experience seamless and enjoyable!
					</p>
					<router-link :to="{ name: 'contact' }">Contact us</router-link>
				</div>
			</div>
		</section>
		<section class="faq-sec z-clr">
			<div class="container">
				<h2 class="tito">Frequently asked questions</h2>
				<div class="faqs">
					<div v-for="(item, index) in faqs" :key="index" class="s-item">
						<!-- <FAQitem :faq="item" /> -->
						<div class="faq-item">
							<div class="qes" @click="toggleAnswer(index)">
								<h4>{{ item.question }}</h4>
								<span
									><i
										class="fa-solid"
										:class="activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'"
									></i
								></span>
							</div>
							<div v-show="activeIndex === index" class="ans">
								<p>{{ item.answer }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<style lang="scss">
.w-page {
	.land {
		padding-bottom: 54px;
		.container {
			@include zflex(row, nowrap, center, center);
			@include less($lS) {
				@include zflex(column-reverse, nowrap, center, center);
				padding-bottom: 48px;
			}
			.col1 {
				padding: 0 8px;
				h1 {
					@include zfont(3.25rem, 400, $bluclr);
					font-family: 'Lilita One', sans-serif;
					letter-spacing: 1px;
				}
				p {
					@include zfont(2rem, 700, #666);
					line-height: 1.4;
				}
				.bbtn {
					@include zbtn($bluclr, 14px 38px);
					@include zfont(1.875rem, 500, #fff);
				}
			}
			.photo {
				max-width: 600px;
			}
		}
	}
	.whatToExpect {
		background-color: $web;
		padding: 48px 0;
		.tit {
			padding: 16px;
		}
		.features {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			column-gap: 40px;
			row-gap: 40px;
			@include between($xlS, $xxlS) {
				grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
				column-gap: 25px;
			}
			@include between($lS, $xlS) {
				grid-template-columns: repeat(2, minmax(215px, 1fr));
				column-gap: auto;
				padding: 0px 32px;
			}
			.feature {
				@include zflex(column, nowrap, space-between, center);
				padding: 16px;
				@include less($mS) {
					max-width: 350px;
					margin-left: auto;
					margin-right: auto;
				}
				.description {
					min-height: 178px;
					h3 {
						@include zfont(1.25rem, 700, $dark);
					}
					p {
						// text-align: justify;
						line-height: 1.35;
						@include zfont(1.125rem, 500, #666);
					}
				}
			}
		}
	}
	.contact {
		padding-top: 86px;
		padding-bottom: 86px;
		.container {
			@include zflex(row, nowrap, center, center);
			gap: 48px;
			@include less($lS) {
				@include zflex(column, nowrap, center, center);
			}
			.photo {
				max-width: 430px;
			}
			.details {
				padding: 0 8px;
				h3 {
					@include zfont(2.25rem, 500, $dark);
				}
				p {
					@include zfont(1.65rem, 500, #666);
					margin: 32px 0 48px;
					line-height: 1.25;
				}
				a {
					@include zbtn(darken($orclr, 5%), 14px 58px);
					@include zfont(1.5rem, 500, #666);
					border-radius: 27.5px;
				}
			}
		}
	}
	.faq-sec {
		padding-top: 54px;
		padding-bottom: 96px;
		.container {
			.faqs {
				padding: 32px 8px 16px;
				.s-item {
					width: 100%;
					border-bottom: 0.5px solid #c0c0c0;
					&:first-of-type {
						border-top: 0.5px solid #c0c0c0;
					}
					.faq-item {
						.qes {
							@include zflex(row, nowrap, space-between, flex-start);
							padding: 30px 0;
							cursor: pointer;
							h4 {
								margin: 0;
								@include zfont(1.5rem, 700, $bdclr);
							}
							span {
								@include zflex;
								background-color: #999;
								padding: 8px;
								border-radius: 4px;
								i {
									font-size: 1.5rem;
									color: #fff;
								}
							}
						}
						.ans {
							overflow: hidden;
							transition: all 0.6s ease;
							p {
								@include zfont(1.25rem, 400, #666);
								margin: 0;
								padding-bottom: 30px;
								line-height: 1.35;
							}
						}
					}
				}
			}
		}
	}
}
</style>
