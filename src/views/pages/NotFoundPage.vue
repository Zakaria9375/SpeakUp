<template>
	<div class="err-page z-clr z-page">
		<div class="container">
			<div class="photo">
				<img src="/static/404/404.svg" alt="404" title="404" loading="lazy" />
			</div>
			<p>We couldn’t find the page that you’re looking for.</p>
			<router-link to="/" class="bbtn">Back to homepage</router-link>
		</div>
	</div>
</template>

<style lang="scss">
.err-page {
	padding-top: 54px;
	padding-bottom: 54px;
	@include zflex;
	.container {
		height: 100%;
		@include zflex;
		flex-direction: column;
		.photo {
			max-width: 600px;
		}
		p {
			line-height: 46px;
			text-align: center;
			@include zfont(1.875rem, 500, #666);
			margin-top: 24px;
		}

		.bbtn {
			margin-top: 24px;
			@include zbtn($bluclr);
			@include zfont(1.25rem, 500, #fff);
		}
	}
}
</style>
